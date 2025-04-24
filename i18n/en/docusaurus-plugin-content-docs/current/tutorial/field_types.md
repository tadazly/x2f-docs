---
sidebar_position: 4
---

# Field Types

For the **type** field (Column C), it's best to fill in *explicit types*, such as:

### Strings

- `string`

### Scalars

- Such as `byte`, `short`, `int`, here's a detailed table:

    Size|Signed|Unsigned|Floating Point
    -|-|-|-
    8-bit|byte, bool|ubyte (uint8)|
    16-bit|short (int16)|ushort (uint16)|
    32-bit|int (int32)|uint (uint32)|float (float32)
    64-bit|long (int64)|ulong (uint64)|double (float64)

    **Value Ranges**:

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

    Try to avoid 64-bit types unless you want your data to explode.

:::tip
Below are some more complex types: enums, structs, and tables (subtables). It's recommended to refer to the usage in [`itemTable.xlsx`](https://github.com/tadazly/xlsx-fbs/blob/master/example/singleConvert/itemTable.xlsx) for comparison.
:::

### Enums

- Use `enum@EnumName` as the type name. In the data sheet, you can fill in either the **enum name** or **enum value**. If the enum values don't start from 0, the property sheet must configure a **default value**. Configure the enum definition in a sheet with the same name:
    
    - First column is the enum name, second column is the type, third column is the enum value (optional)
    - Types only support integer scalars: `byte, ubyte, short, ushort, int, uint, long, ulong`
    - If enum values are omitted, the first value defaults to 0, and subsequent values increment by 1
    - Enums should generally only be added to, not removed, and types should not be changed arbitrarily

### Structs

- Use `struct@StructName` as the type name. Fill in data using the json structure `{ key: value, key: [value] ... }`. When filling in, you must follow the structure definition and **fill in all data completely**. Configure the structure definition in a sheet with the same name:
    
    - First column is the field name, second column is the type
    - Types only support **scalars** and **fixed-length arrays**, such as `int, [float:3] ...`

### Tables

- Use `table@SubTableName` as the type name. The configuration method is the same as the data sheet and property sheet specifications above. Fill in the index id of the subtable in the data sheet. Configure the structure definition in a sheet with the same name, and configure properties in `property@SubTableName`.

    - The order of the subtable's property sheet is fixed as ABCDE and cannot be changed.
    - The subtable must have an **id** field for indexing in the data sheet.

### Vectors

- Vectors of any of the above types (represented by `[type]`), with any number of elements.

    - Vector length is arbitrary, separated by commas. For example: `6,6,6`
    - Subtable vectors `[table@SubTable]`, please fill in the corresponding index id in the subtable. For example: `1,2,3,4,5`
    - Struct vectors `[struct@TestStruct]`, please fill in the complete struct data, separated by commas. For example: `{x:3, y:2, z:1,v:[1,3,4]},{x:1,y:1,z:1,v:[1,2,3]}`

:::info
### About Type Inference

For fields with **numeric** values, when using *ambiguous types* like `number`, the program will determine the **scalar** type. Enums and structs **do not support** automatic type inference.
:::

:::caution
### Type Warnings

- When type inference results in `bool`, a warning will be issued. In this case, you need to manually mark the type as `bool` in the table.
- When types don't match or numeric checks exceed the configured type, warnings will also be issued, and the value will be **zeroed out**!
:::