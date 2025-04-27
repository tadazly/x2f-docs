---
sidebar_position: 3
---

# 常见问题

## 运行时问题

### System.OverflowException: Value was either too large or too small for an Int16. 

- 触发时机：

```csharp
Xls.SomeTable.Instance.LoadAsync();
Xls.MergeTableLoader.LoadAllAsync();
```

- 问题原因：表中存在大量数据时，偏移量超出验证方法中的 `short` 类型范围。

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

    1. 修改 FlatBuffers 的 `GetVRelOffset` 方法，使用 `int` 类型代替 `short` 类型。

    ```csharp title="FlatBuffers/FlatBufferVerify.cs" {2} showLineNumbers
    // short vtable = Convert.ToInt16(pos - ReadSOffsetT(verifier_buffer, pos));
    // 👇 修改成下面这样
    int vtable = pos - ReadSOffsetT(verifier_buffer, pos);
    ```

    2. 或者修改 UnityTemplate 的 `TableValidator.Validate` 方法，只验证 `identifier` 是否匹配，不验证 `buffer` 结构。
