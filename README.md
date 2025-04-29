# X2F 文档

### 简介

X2F 是一个配置简单、容易上手的 Excel 转 FlatBuffers 工具，适合中小型游戏配置表。

仓库地址 => [xlsx-fbs](https://github.com/tadazly/xlsx-fbs)，欢迎尝试。

---

### 关于本文档

本文档使用 [Docusaurus](https://docusaurus.io/) 生成、 GitHub Actions 自动部署。

---

### 如何白嫖 GitHub Pages 部署网站

以 Docusaurus 为例，可以实现 push 代码后自动部署到 GitHub Pages。

有兴趣的可以参考[github-pages-docusaurus](https://github.com/LayZeeDK/github-pages-docusaurus)搭建环境，下面列举关键点。

建议使用本项目提供的 [`deploy-docs.yml`](.github/workflows/deploy-docs.yml) 文件。

#### 1. 创建文档项目

```bash
npx create-docusaurus@latest my-website classic
```

#### 2. 修改 `docusaurus.config.js` 配置

- 创建常量 `organizationName` 和 `projectName`

    ```js
    const organizationName = "<github-organization-name>";
    const projectName = "<repository-name>";
    ```

- 修改配置如下

    ```js
    const config = {
    // (...)
    url: `https://${organizationName}.github.io`,
    baseUrl: `/${projectName}/`,
    organizationName,
    projectName,
    // (...)
    presets: [
        [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
            // (...)
            docs: {
            // (...)
            editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
            },
            blog: {
            // (...)
            editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
            },
        }),
        ],
    ],
    };
    ```

#### 3. 拷贝 [`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml) 到自己仓库的相同路径

修改 `branches`、`Build steps` 和 `build output path` 符合您的项目。

#### 4. 在 `YourGitHubRepo/Settings/Pages` 中设置 `Source` 为 `GitHub Actions`。

接下来，您只需推送项目等待奇迹发生。

---

如果帮助到您，请为我点赞 😊

---

### 如何给文档添加搜索功能

安装本地搜索插件：

```js
npm install @easyops-cn/docusaurus-search-local
```

在 `docusaurus.config.js` 中添加配置：

```js
var config = {
    // (...)
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        removeDefaultStopWordFilter: true,
        // ```
      }),
    ],
  ],
};
```

---

### 如何给文档添加多语种翻译

#### 1. 修改 `docusaurus.config.js` 配置

```js
const config = {
    // (...)
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
        localeConfigs: {
        zh: {
            label: '中文',
            direction: 'ltr',
        },
        en: {
            label: 'English',
            direction: 'ltr',
        },
        },
    },
    // (...)
}
```

#### 2. 使用命令行生成对应的 i18n 文件

若 `defaultLocale` 是 `en`，可以直接运行下面的命令，会生成 `i18n/zh`：

```bash
npm run write-translations
```

若 `defaultLocale` 是 `zh`，则需要运行下面的命令来生成对应的语言文件：

```bash
npm run write-translations -- --locale en
```

创建出目录后，将 `docs` 目录下的文件拷贝到 `i18n/en/docusaurus-plugin-content-docs` 目录下，自行翻译即可。

#### 3. 自定义翻译

上面讲了文档的翻译文件如何创建，接下来讲讲如何在 `src/pages/index.js` 和 `src/components/HomepageFeatures.js` 中使用 i18n。

1. 在代码中引入 `Translate` 组件： 

```js
import Translate from '@docusaurus/Translate';
```

2. 然后在需要多语言的地方插入 `Translate` 组件，id 自行设置：

```js
<Translate id="homepage.title">
  Excel to FlatBuffers
</Translate>
```

3. 执行命令行生成对应的 i18n 文件，比如：

```bash
npm run write-translations -- --locale en
```

4. 搜索 `Translate` 组件中定义的 id 如上面的 `homepage.title`，找到配置文件进行翻译即可。

最后，别忘了加上语言切换按钮，不然上面白干。

```js
var config = {
    // (...)
    themeConfig: {
        navbar: {
            items: [
                // (...)
                {
                    type: 'localeDropdown',
                    position: 'right',
                },
            ],
        },
    },
};
```
