---
sidebar_position: 2
---

# 配表示例

仅简单展示，具体的请阅读 [**配表规范**](./excel_standards.md) 与 [**字段类型**](./field_types.md)。

还提供了一个乱配的 [itemTable.xlsx](https://github.com/tadazly/xlsx-fbs/blob/master/example/singleConvert/itemTable.xlsx) 仅供娱乐参考～

下面是一个简单的示范，假设有一张 item.xlsx 表：

### item: 数据页

:::tip
数据页的第一行定义了字段名，与属性页的第一列中定义的字段名对应，顺序可以不同。
:::

A|B|C|D|E
-|-|-|-|-
道具id|道具名|描述|最大数|每日上限
101|豆子|交易东西的基础货币|99999999|100000
102|钻石|交易稀有物品的货币|99999999|
1001|HP药|有了他你就能随便浪|9999|99

### property: 属性页

:::tip
属性页的 A 列定义 **字段名**，B 列定义了字段的 **变量名**，C 列定义字段的 **类型**，D 列定义字段的 **默认值**（可省略），E 列定义字段的 **属性**（可省略），后面几列随你发挥。  
属性页的顺序是可以通过[打表参数 `--property-order`](./argument_list.md#属性页的默认值) 自定义的，默认是 ABCDE。
:::

A|B|C|D|E|F
-|-|-|-|-|-
道具id|id|int|||一些功能注释
道具名|name|string||required|
描述|desc|string|||
策划偷偷删掉的|wtf|uint||deprecated|字段就算不用了也最好保留，手动标记废弃
最大数|max|number|9999||玩家可以拥有的最大数量
每日上限|dailyLimit|number|||每天最多获得数量限制


**x2f 打表** 会自动生成下述结构描述(.fbs)文件：

```
// item.xlsx

namespace Xlsx;

table ItemInfo {
    /// 道具id
    id:int;
    /// 道具名
    name:string (required);
    /// 描述
    desc:string;
    /// 策划偷偷删掉的
    wtf:uint (deprecated);
    /// 最大数
    max:uint = 9999;
    /// 每日上限
    daily_limit:uint;
}

table Item {
    item_infos:[ItemInfo];
}

root_type Item;
```