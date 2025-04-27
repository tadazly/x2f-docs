---
sidebar_position: 3
---

# 常见问题

## 运行时问题

### Exception: System.OverflowException: Value was either too large or too small for an Int16. 

- 触发时机：

```csharp
Xls.MergeTableLoader.LoadAllAsync();
```

- 问题原因：合并表中存在大量表时，偏移量超出验证方法中的 `short` 类型范围。

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

- 解决方案：

    1. 只验证二进制的 file_identifier 是否匹配，无视该异常。

    2. 不使用合并表功能，仅使用单表加载。

    3. 修改 `FlatBufferVerify.cs` 文件中的相关方法，使用 `int` 类型代替 `short` 类型。
