---
sidebar_position: 2
---

# Table Configuration Example

This is just a simple demonstration. For details, please read [**Table Configuration Standards**](./excel_standards.md) and [**Field Types**](./field_types.md).

There's also a randomly configured [itemTable.xlsx](https://github.com/tadazly/xlsx-fbs/blob/master/example/singleConvert/itemTable.xlsx) for entertainment reference~

Below is a simple example, assuming there's an item.xlsx table:

### item: Data Sheet

:::tip
The first row of the data sheet defines the field names, which correspond to the field names defined in the first column of the property sheet. The order can be different.
:::

A|B|C|D|E
-|-|-|-|-
Item ID|Item Name|Description|Max Count|Daily Limit
101|Beans|Basic currency for trading|99999999|100000
102|Diamonds|Currency for trading rare items|99999999|
1001|HP Potion|With this, you can do whatever you want|9999|99

### property: Property Sheet

:::tip
Column A of the property sheet defines the **field name**, Column B defines the **variable name**, Column C defines the **type**, Column D defines the **default value** (optional), Column E defines the **attributes** (optional), and the following columns are up to you.  
The order of the property sheet can be customized through the [table generation parameter `--property-order`](./argument_list.md#property-sheet-default-values), with the default being ABCDE.
:::

A|B|C|D|E|F
-|-|-|-|-|-
Item ID|id|int|||Some functional comments
Item Name|name|string||required|
Description|desc|string|||
Secretly Deleted by Planner|wtf|uint||deprecated|It's better to keep fields even if not used, just mark them as deprecated
Max Count|max|number|9999||Maximum quantity a player can have
Daily Limit|dailyLimit|number|||Maximum daily acquisition limit


**x2f table generation** will automatically generate the following structure description (.fbs) file:

```
// item.xlsx

namespace Xlsx;

table ItemInfo {
    /// Item ID
    id:int;
    /// Item Name
    name:string (required);
    /// Description
    desc:string;
    /// Secretly Deleted by Planner
    wtf:uint (deprecated);
    /// Max Count
    max:uint = 9999;
    /// Daily Limit
    daily_limit:uint;
}

table Item {
    item_infos:[ItemInfo];
}

root_type Item;