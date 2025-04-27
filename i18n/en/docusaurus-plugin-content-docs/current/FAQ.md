---
sidebar_position: 3
---

# FAQ

## Runtime Issues

### System.OverflowException: Value was either too large or too small for an Int16.

- Trigger condition:

```csharp
Xls.SomeTable.Instance.LoadAsync();
Xls.MergeTableLoader.LoadAllAsync();
```

- Cause: When there is a large amount of data in the table, the offset exceeds the range of the `short` type in the verification method.

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

    1. Modify the `GetVRelOffset` method in FlatBuffers to use `int` type instead of `short` type.

    ```csharp title="FlatBuffers/FlatBufferVerify.cs" {2} showLineNumbers
    // short vtable = Convert.ToInt16(pos - ReadSOffsetT(verifier_buffer, pos));
    // 👇 Change to this
    int vtable = pos - ReadSOffsetT(verifier_buffer, pos);
    ```

    2. Or modify the `TableValidator.Validate` method in UnityTemplate to only verify that the `identifier` matches, without verifying the `buffer` structure. 