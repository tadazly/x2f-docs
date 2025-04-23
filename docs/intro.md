---
sidebar_position: 1
---

# xlsx-fbs 打表工具

**xlsx-fbs**（a.k.a. `x2f`）是一个将 Excel 表格批量转换为 [FlatBuffers](https://flatbuffers.dev/) 的命令行工具，支持生成 结构定义 `.fbs` 、表数据`.json` 、 FlatBuffers 二进制 `.bin` 和 多语言数据类（如 `.ts`、`.cs`、`.h` 等）。

配表规则**简单易懂**，并支持多种 FlatBuffers 结构，如 枚举、结构体、子表、向量。

### 🧬 FlatBuffers 类型支持

配表支持类型如下：

- [标量（Scalars）](./tutorial/field_types.md#标量-scalars)
- [向量（Vectors）](./tutorial/field_types.md#向量-vectors)
- [字符串（Strings）](./tutorial/field_types.md#字符串-strings)
- [结构体（Structs）](./tutorial/field_types.md#结构体-structs)
- [结构表/子表（Tables）](./tutorial/field_types.md#结构表子表-tables)
- [枚举（Enums）](./tutorial/field_types.md#枚举-enums)
- [定长数组 (Arrays)](./tutorial/field_types.md#结构体-structs) - 仅结构体(struct)中可用

与官网的[类型支持页面](https://flatbuffers.dev/schema/)对应。