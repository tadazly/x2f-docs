---
sidebar_position: 3
---

# Table Configuration Standards

### Table Naming Standards

- Table names should use English characters, preferably in lowerCamelCase naming convention. **Do not use** Chinese characters, special symbols, or Emojis💩.

- Table names will be used to generate class names, so avoid using any programming language reserved keywords.

### Data Sheet Standards

- Data sheet Sheet name should use the **table name**

- Data sheets don't have many restrictions. The order of fields can be different from the property sheet, as long as the field names correspond to the property sheet and the types comply with the standards. The rest can be blamed on the planners.

- Deprecated fields can be deleted from the data sheet.

- To standardize table data structure and avoid unnecessary issues, try to use `int (int32)` as the id field type. In Unity, numeric field types should also be unified to use `int`.

### Property Sheet Standards

- Property sheet Sheet name should use **property** or **属性** (attributes)

The following standards are based on FlatBuffers [Schema (.fbs) Rules](https://flatbuffers.dev/evolution/#rules):

- The order of fields defined in the property sheet determines the field order in the .fbs file, so it cannot be changed arbitrarily, nor can fields be deleted randomly!

- New fields must be added to the last row of the property sheet, for the same reason as above.

- Deprecated fields cannot be deleted, just fill in `deprecated` in the **属性** (attributes) column.

- Field names cannot use `reserved keywords`; cannot start with `add`, cannot be `getType`. Please avoid naming conflicts with code interfaces.

- Field names and variable names can be changed, but remember to update the code as well.

- Try not to change field types, as old data might explode after changes.

- Don't randomly change default values.

#### Default Values

For the **default value** field (Column D), if not filled, scalar types default to `0`, and other types default to `null`.

:::caution
Only **scalars** and **enums** can set default values. Guess why.
:::

#### Attributes

For the **attributes** field (Column E), please refer to the [official documentation](https://flatbuffers.dev/schema/#attributes). If filled, it will be added to the right of the field in the .fbs file. Generally, only `deprecated` and `required` are commonly used. Common ones are as follows:

Attribute|Purpose
-|-
deprecated|Deprecated field
required|Required field, used for non-scalar types, will report an error if no data
key|Key field for sorting and searching in vectors
id|Custom field number (for version compatibility)
force_align|Force alignment
bit_flags|Enum values can be combined