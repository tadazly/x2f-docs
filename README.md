# X2F 文档

### 简介

X2F 是一个配置简单、容易上手的 Excel 转 FlatBuffers 工具，适合中小型游戏配置表。

仓库地址 => [xlsx-fbs](https://github.com/tadazly/xlsx-fbs)，欢迎尝试。

### 关于本文档

本文档使用 [Docusaurus](https://docusaurus.io/) 生成、 GitHub Actions 自动部署，有兴趣的可以参考[github-pages-docusaurus](https://github.com/LayZeeDK/github-pages-docusaurus)搭建环境，下面列举关键点。

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

如果帮助到您，请为我点赞 😊
