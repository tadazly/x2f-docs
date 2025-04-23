---
sidebar_position: 8
---

# 附录

## 关于 output_censored 目录

- 打单张表时，若传入 `--censored-fields <fields>` 时，会同时生成 **删减版** 和 **完整版** 两份输出文件，分别对应在 `output_censored/` 和 `output/` 目录中。

- 批量打表时，若 $tables.xlsx 中配置了 `censoredTable` 或 `censoredFields` 字段，会同时生成 **删减版** 和 **完整版** 两份输出文件，其中标记 `censoredTable` 的表，将 **不会** 输出到 `output_censored/` 目录中，只会输出到 `output/` 中。

- 没有配置 `censoredTable` 或 `censoredFields` 字段，只会输出一份 `output/`。

## 关于 file_identifier

x2f 使用 fbs 内容的 hash 作为 .fbs 的 file_identifier，可用生成代码中的 `BufferHasIdentifier` 接口来校验二进制与代码是否匹配。


## uint64/int64 精度问题

在表格中存储诸如 9007199254740993 的数字时会丢失精度，可以将单元格设置为文本以保留精度。