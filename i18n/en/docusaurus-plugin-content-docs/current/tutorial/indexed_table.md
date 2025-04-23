---
sidebar_position: 5
---

# 索引表配置

批量打表时，在传入的路径放置 `$tables.xlsx` 可用于配置，哪些表要打和一些指定的行为。

:::tip
在打表根目录中，任何以 `$` 开头的表都会被当作索引表，比如 `$items.xls`。
:::

索引表的结构和数据表一样，但是配置以下这些 **功能字段**。

- **tableName**: 需要打表的表名，是文件名不需要后缀，若不配置将不会打表。

- **merge**: 是否合并到一张大表中，方便预加载，标记的表会被合并到 `mergeTable` 中。

- **censoredTable**: 敏感表，将不会输出到 `output_censored/` 目录中，但是会输出到 `output/` 中。一般用于前后端共用一套打表逻辑时，从前端目录中删除后端表。

- **censoredFields**: 敏感字段，使用 `,` 连接表中的指定字段（变量名），会删除这些字段后输出到 `output_censored/` 目录中，同时未删减版会输出到 `output/` 中。也是起到将后端使用数据从前端表中移除的作用。

- **constFields**: 常量字段，会使用表中的指定字段作为常量，值类型仅支持`int`或`string`，并转换到独立的 Xlsx.tableNameConst 类中，配置方式为 `[{"key":"","value":"","desc":""},{"key":"","value":"","desc:"""},...]`。例如想使用 **NPC名** 作为常量获取到 **NPC的id** 时，可以这样配置 `[{"key":"npcName","value":"id","desc":"npcDesc"}]`。

:::info
当没有在批量打表目录中放置 $tables.xlsx 时，会默认打目录下的所有表。
:::

:::caution
常量定义代码仅实现了 C# 和 TS/JS。
:::