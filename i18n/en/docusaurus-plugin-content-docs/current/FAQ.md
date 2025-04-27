---
sidebar_position: 3
---

# FAQ

## Runtime Issues

### Exception: System.OverflowException: Value was either too large or too small for an Int16.

- Trigger condition:

```csharp
Xls.MergeTableLoader.LoadAllAsync();
```

- Cause: When there are a large number of tables in the merged table, the offset exceeds the range of the `short` type in the verification function.

```csharp title="FlatBuffers/FlatBufferVerify.cs" {8} showLineNumbers
private short GetVRelOffset(int pos, short vtableOffset)
{
    short VOffset = 0;
    // Used try/catch because pos typa as int 32bit
    try
    {
    // First, get vtable offset
    short vtable = Convert.ToInt16(pos - ReadSOffsetT(verifier_buffer, pos));
    // Check that offset points to vtable area (is smaller than vtable size)
    if (vtableOffset < ReadVOffsetT(verifier_buffer, vtable))
    {
        // Now, we can read offset value - TODO check this value against size of table data
        VOffset = ReadVOffsetT(verifier_buffer, vtable + vtableOffset);
    }
    // (...)
}
```

- Solutions:

    1. Only verify that the binary file_identifier matches, ignore this exception.

    2. Do not use the merge table feature, only use single table loading.

    3. Modify the relevant methods in the `FlatBufferVerify.cs` file to use `int` type instead of `short` type. 