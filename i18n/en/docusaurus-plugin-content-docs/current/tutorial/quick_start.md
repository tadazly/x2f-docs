---
sidebar_position: 1
---

# Quick Start

Get started with table generation in three minutes~

## Dependencies

- Node.js v22.12.0+: Not tested with other versions, but theoretically should work with versions above 20.

:::tip
If you don't have Node.js installed, you can refer to [VOLTA](https://docs.volta.sh/guide/getting-started) for node version management
:::

## Install x2f

0. Clone the project

    ```shell
    git clone https://github.com/tadazly/xlsx-fbs.git
    cd xlsx-fbs
    ```

1. Initialize the project (run npm install, can't skip the ceremony)

    ```shell
    npm install
    ```

2. Link global command

    ```shell
    npm link
    ```

3. Test it out, view help information

    ```shell
    xlsx-fbs -h     # Default command
    x2f -h          # Short command
    ```

- Want to end this relationship? Just remove the global link:

    ```shell
    npm unlink -g
    ```

## Start Generating Tables

There are several example tables in the project's `example/` directory.

```
example/
├── singleConvert/       # Single table generation example
│   └── itemTable.xlsx/        
└── batchConvert/        # Batch table generation example
    ├── any_directory/           
    └── $tables.xlsx     # Index table (optional, but recommended)
```

:::info
Index table naming starts with `$` . For example, `$items.xls` can also be used as an index table.
:::

### 🎯 Single Table Generation

```shell
cd example/singleConvert
x2f itemTable.xlsx --cpp --rust
```

### 🎯 Batch Table Generation

```shell
cd example/batchConvert
x2f --js --csharp
```

### Output Files

The output directory structure is as follows:

```
output[_censored]/
├── fbs/         # Generated .fbs
├── bin/         # Generated binaries
├── scripts/     # Generated code
│   ├── cpp/     # C++ code
│   ├── csharp/  # C# code
│   └── ts/      # TypeScript code
└── json/        # JSON generated from Excel
```