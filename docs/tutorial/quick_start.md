---
sidebar_position: 1
---

# 快速上手

三分钟带你打出表~

## 依赖环境

- Node.js v22.12.0+: 其他没测过，理论上 20 以上都行吧。

:::tip
没有安装 Nodejs 环境的，可以参考 [VOLTA](https://docs.volta.sh/guide/getting-started) 进行 node 版本管理
:::

## 安装 x2f

0. 克隆项目

    ```shell
    git clone https://github.com/tadazly/xlsx-fbs.git
    cd xlsx-fbs
    ```

1. 初始化项目（跑个 npm install，仪式感不能少）

    ```shell
    npm install
    ```

2. 链接全局指令

    ```shell
    npm link
    ```

3. 测试一下，查看帮助信息

    ```shell
    xlsx-fbs -h     # 默认命令
    x2f -h          # 简写命令
    ```

- 想退出这段关系？删掉全局链接即可：

    ```shell
    npm unlink -g
    ```

## 开始打表

项目内的 `example/` 有几张示例表。

```
example/
├── singleConvert/       # 打单张表示例
│   └── itemTable.xlsx/        
└── batchConvert/        # 批量打表示例
    ├── 任意目录/           
    └── $tables.xlsx     # 索引表（可选，但建议有）
```

:::info
索引表命名使用 `$` 开头即可，比如 `$items.xls` 也可以作为索引表。
:::

### 🎯 单张打表

```shell
cd example/singleConvert
x2f itemTable.xlsx --cpp --rust
```

### 🎯 批量打表

```shell
cd example/batchConvert
x2f --js --csharp
```

### 输出文件

输出的目录结构如下：

```
output[_censored]/
├── fbs/         # 生成的 .fbs
├── bin/         # 生成的二进制
├── scripts/     # 生成的代码
│   ├── cpp/     # C++ 代码
│   ├── csharp/  # C# 代码
│   └── ts/      # TypeScript 代码
└── json/        # 由 Excel 生成的 json
```