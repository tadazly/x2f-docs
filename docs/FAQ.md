---
sidebar_position: 4
---

# 常见问题

## 打表问题

### 什么时候会生成 output_censored 目录

- 打单张表时，若传入 `--censored-fields <fields>` 时，会同时生成 **删减版** 和 **完整版** 两份输出文件，分别对应在 `output_censored/` 和 `output/` 目录中。

- 批量打表时，若 $tables.xlsx 中配置了 `censoredTable` 或 `censoredFields` 字段，会同时生成 **删减版** 和 **完整版** 两份输出文件，其中标记 `censoredTable` 的表，将 **不会** 输出到 `output_censored/` 目录中，只会输出到 `output/` 中。

- 没有配置 `censoredTable` 或 `censoredFields` 字段，只会输出一份 `output/`。

### 关于 file_identifier

x2f 使用 .fbs 文件内容 **SHA-256** 的前四个字符作为 file_identifier。

可用生成代码中的 `BufferHasIdentifier` 接口来校验二进制与代码是否匹配（若使用 x2f 生成的 Unity 表格加载类， `Load` 时会自动校验）。

### uint64/int64 精度问题

在表格中存储诸如 `9007199254740993` 的数字时会丢失精度，可以将单元格设置为文本以保留精度。

## 运行时问题

### [ C# ] System.OverflowException: Value was either too large or too small for an Int16. 

- 触发时机：验证 buffer 时，比如：

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
