---
sidebar_position: 4
---

# 字段类型

字段的 **类型**（ C 列），最好填写 *明确的类型*，如：

### 字符串 Strings

- `string`

### 标量 Scalars

- 如 `byte`，`short`，`int`，下面给出具体的表格：

    大小|有符号|无符号|浮点数
    -|-|-|-
    8-bit|byte, bool|ubyte (uint8)|
    16-bit|short (int16)|ushort (uint16)|
    32-bit|int (int32)|uint (uint32)|float (float32)
    64-bit|long (int64)|ulong (uint64)|double (float64)

    **取值范围**：

    8-bit:
    - byte: -128 ~ 127
    - bool: true / false
    - ubyte: 0 ~ 255

    16-bit:
    - short: -32,768 ~ 32,767
    - ushort: 0 ~ 65,535

    32-bit:
    - int: -2,147,483,648 ~ 2,147,483,647
    - uint: 0 ~ 4,294,967,295
    - float: ±1.5×10^-45 ~ ±3.4×10^38

    64-bit:
    - long: -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807
    - ulong: 0 ~ 18,446,744,073,709,551,615
    - double: ±5.0×10^-324 ~ ±1.7×10^308

    尽量不要碰 64-bit 的类型，除非你想让数据爆炸。


:::tip
下面是一些比较复杂的类型，枚举（enum）、结构体（struct）和 结构表（子表）（table），建议参考 [`itemTable.xlsx`](https://github.com/tadazly/xlsx-fbs/blob/master/example/singleConvert/itemTable.xlsx) 中的用法作为比较。
:::

### 枚举 Enums

- 使用 `enum@EnumName` 作为类型名称，数据页可以填写 **枚举名** 或 **枚举值**，如果枚举值不是从 0 开始，则属性页必须配置 **默认值**。在同名 Sheet 下配置枚举定义：
    
    - 第一列是枚举名，第二列是类型， 第三列是枚举值（可省略）
    - 类型仅支持整形标量 `byte, ubyte, short, ushort, int, uint, long, ulong`
    - 枚举值省略的情况下，默认第一个值为0，后面的值为前一个值加一
    - 枚举一般只增不减，类型也最好不要随意更改

### 结构体 Structs

- 使用 `struct@StructName` 作为类型名称，用 `{ key: value, key: [value] … }` 这种 json 结构来填写数据，填写时必须按照结构定义，**完整填写数据**。在同名 Sheet 下配置结构定义：
    
    - 第一列是字段名，第二列是类型
    - 类型仅支持**标量**和**定长数组**，如 `int, [float:3] ...`

### 结构表/子表 Tables

- 使用 `table@SubTableName` 作为类型名称，配法和和上面的数据页、属性页规范一致，在数据页中填写结构表中的索引 id。在同名 Sheet 下配置结构定义，在 `property@SubTableName` 中配置属性。

    - 结构表的属性页的顺序固定为 ABCDE, 不可更改。
    - 结构表必须有 **id** 字段，用于在数据页索引。

### 向量 Vectors

- 任何以上类型的向量（用 `[type]` 表示），向量中元素的数量任意。

    - 向量长度任意，用逗号分隔。如 `6,6,6`
    - 结构表向量 `[table@SubTable]`，请填写结构表中对应的索引id。如 `1,2,3,4,5`
    - 结构体向量 `[struct@TestStruct]`，请完整填写结构体数据，用逗号分隔。如 `{x:3, y:2, z:1,v:[1,3,4]},{x:1,y:1,z:1,v:[1,2,3]}`

:::info
### 关于类型推导

对于字段的值是 **数值**，当使用 *不明确的类型* `number` 时，由程序判断 **标量** 类型。枚举、结构体 **不支持**自动类型推导。
:::

:::caution
### 类型警告

- 类型推导出 `bool` 时，会警告，此时需要在表中手动标记该类型为 `bool`。
- 类型不比配 或 数值检查超出配置的类型时，也会警告，并将值 **清零**！
:::