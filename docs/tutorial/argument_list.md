---
sidebar_position: 7
---

# 参数列表

```shell
x2f [ input ] [ flatc options ] [ xlsx-fbs options ]
```

### input 选项

Excel 文件路径或 Excel 所在的文件夹路径，传入文件则转换单张表，传入路径则 **递归** 转换文件夹下的所有表，不传默认转换 `x2f` 执行路径下的所有表。 

### flatc 选项

可转换的代码语言和 **flatc** 的完整参数列表请参考 [FlatBuffers 文档](https://flatbuffers.dev/flatc/)，xlsx-fbs 会将参数传递给 **flatc**。以下列举一些常用的：

- `--cpp --csharp --ts --java` 等，生成对应语言的代码。

### xlsx-fbs 选项

- `-o, --output <path>` 输出路径，默认输出到执行 `xlsx-fbs` 的文件夹的 `output/` 下。

- `-n, --namespace <name>` 生成代码的命名空间，默认是 `Xlsx`。

- `-k, --default-key <field>` 默认不使用 key 属性，传入后，若表里没有设置 key 属性的字段，则使用该字段作为 key。

- `--binary-extension <ext>` 输出的二进制文件的后缀名，默认输出 bin，你爱发疯可以填 wtf.bytes。

- `--censored-fields <fields>` 删减字段，使用 `,` 连接，会生成一份删减版本的文件到 `output_censored/` 目录。（注意不是删除数据，而是把整个字段从 .fbs 中删除！）

- `--censored-output <path>` 指定删减表的输出路径，默认是 `${output}_censored/`。

- `--output-bin <path>` 拷贝输出的 bin 到指定路径。此类拷贝参数仅批量打表可用，且都会保留原输出路径下的文件。

- `--output-csharp <path>` 拷贝输出的代码到指定路径，以 C# 为例，其他请替换成对应语言名。

- `--censored-output-bin <path>` 拷贝删减版输出的 bin 到指定路径。

- `--censored-output-csharp <path>` 拷贝删减版输出的代码到指定路径，以 C# 为例，其他请替换成对应语言名。

- `--clean-output` 批量打表前，强制清空输出目录，小心使用，不要误删无辜。

- `--empty-string` 表中字符串类型的字段在创建二进制时默认填充空字符串而不是 null。

- `--disable-merge-table`  批量打表时，若在配置表中配置了 `merge` 字段，默认会为这些表生成 `mergeTable` 的代码和二进制，不想要此功能可禁用。

- `--disable-incremental` 批量打表默认开启增量打表，也可以手动关闭。

- `--enable-streaming-read` 开启 .xlsx 格式的流式读取，速度快，内存小，中文可能会乱码😠，还有不稳定出现数据变成 sharedString 的 bug，建议先**不要用**，等 ExcelJS 项目修复。

- `--table-class-suffix <suffix>` 生成的表格类名后缀，默认是空字符串。比如 `item.xlsx` 表生成的表格类名就是 `Item`。

- `--data-class-suffix <suffix>` 生成的表格数据类名后缀，默认是 `Info`。比如 `item.xlsx` 表生成的数据类名就是 `ItemInfo`；必须避免出现使用类后缀结尾命名的表，比如批量打表时，目录下同时有 `drop.xlsx` 和 `dropInfo.xlsx`，那么第一张表的数据类名会和第二张表的类名冲突，BOOM💥。

- `--multi-thread <number>` 批量打表时的多线程数量，默认 6 。

- `--minimal-info` 最小化输出信息，可选范围 `log < info < warn < error`，默认 `info`。

- `--allow-wild-table` 批量打表时允许打野表（$tables.xlsx中未配置的表）。慎用，确保不会把奇怪的东西打出来。

    :::info
    #### 属性页的默认值：
        - A: 数据页的字段名（可随意填写，和属性页做映射关系，并作为生成的 .fbs 中的字段名注释）
        - B: 字段对应的变量名（对应 .fbs 中的 field，和代码中的成员字段名）
        - C: 字段对应的类型（`short`, `int`, `string` ... 等）
        - D: 字段的默认值 （对应 .fbs 中的默认值）
        - E: 字段的属性 （对应 .fbs 中的 Attribute）
    :::

- `--property-order` 自定义属性页顺序，默认 ABCDE。可根据实际表格中列的顺序来定义，例如想直接用表格属性页中 A 列的字段名作为变量名，B列已经定义了类型，并且 C 列被注释占用，那就传入 AABDE，顺序与 **字段名->变量名->类型->默认值->属性** 对应即可。

- `--csharp-unity-loader` 生成 Unity 的表格加载类，数据页需配置 int 类型的 id 字段。

- `--csharp-unity-loader-suffix` 表格加载类后缀，默认 `Table`，要想简短可以用 `s` 。

- `--js` 打包 js。 浏览器用输出的 `.js`, node 用 `.cjs.js` 或 `.esm.js`。 

- `--js-sourcemap`

- `--js-exclude-flatbuffers` 打包的 js 中移除 flatbuffers 代码，确保在外部正确引入。

- `--js-browser-target <target>` 默认 `es2017`，可以传哪些[自己研究](https://esbuild.github.io/api/#target)，使用 `,` 连接，比如 `--js-browser-target "es2020,chrome58,edge16,firefox57"`

- `--js-node-target <target>` 默认 `node20`。