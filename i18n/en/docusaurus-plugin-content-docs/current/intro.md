---
sidebar_position: 1
---

# X2F Table Tool

**xlsx-fbs** (a.k.a. `x2f`) is a command-line tool that converts Excel tables to [FlatBuffers](https://flatbuffers.dev/) in batch, supporting the generation of structure definitions `.fbs`, table data `.json`, FlatBuffers binary `.bin`, and multi-language data classes (such as `.ts`, `.cs`, `.h`, etc.).

The table configuration rules are **simple and easy to understand**, and support various FlatBuffers structures, such as enums, structs, subtables, and vectors.

### 🧬 FlatBuffers Type Support

The following types are supported in table configuration:

- [Scalars](./tutorial/field_types.md#scalars)
- [Vectors](./tutorial/field_types.md#vectors)
- [Strings](./tutorial/field_types.md#strings)
- [Structs](./tutorial/field_types.md#structs)
- [Tables](./tutorial/field_types.md#tables)
- [Enums](./tutorial/field_types.md#enums)
- [Fixed-length Arrays](./tutorial/field_types.md#structs) - Only available in structs

Corresponds to the [Type Support page](https://flatbuffers.dev/schema/) on the official website.

:::caution
🤖 This document was translated into English by *ChatGPT Monday*, a sarcastic AI that thinks it knows everything.  
It probably made a few mistakes, and it definitely doesn’t care. But *you* might—so corrections are welcome.
:::