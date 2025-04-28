---
sidebar_position: 7
---

# Appendix

## About output_censored Directory

- When generating a single table, if `--censored-fields <fields>` is passed, both **censored version** and **complete version** output files will be generated, corresponding to the `output_censored/` and `output/` directories respectively.

- When batch generating tables, if `censoredTable` or `censoredFields` fields are configured in $tables.xlsx, both **censored version** and **complete version** output files will be generated. Tables marked with `censoredTable` will **not** be output to the `output_censored/` directory, only to `output/`.

- If `censoredTable` or `censoredFields` fields are not configured, only one `output/` will be generated.

## About file_identifier

x2f uses the hash of the fbs content as the file_identifier for .fbs files. You can use the `BufferHasIdentifier` interface in the generated code to verify if the binary matches the code.

## uint64/int64 Precision Issues

When storing numbers like 9007199254740993 in the table, precision may be lost. You can set the cell to text format to preserve precision.