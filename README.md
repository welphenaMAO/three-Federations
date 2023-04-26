# THREE-FEDERATIONS + mini-program (typescript version)

THREE-FEDERATIONS + 小程序, 使用 TypeScript 构建, 含更完善的小程序 Types 和 THREE-FEDERATIONS Types 定义.

> Built by [miniprogram-build](https://github.com/NewFuture/miniprogram-build)
> Types via [@dragongate/miniprogram-api-typings](https://github.com/MS-DG/api-typings)

---

## Required [所需环境]

- nodejs: `npm` >= 6.0(或者`yarn | pnpm`)
- Editor: VSCode
- Devtools: 小程序开发工具

## Quick Start

1. 安装依赖 [在项目文件下运行]

```sh
npm install
# 或者
yarn install # 推荐方式 (速度快)
```

2. 编译项目

```sh
npm start
# 或者
yarn start
```

3. 调试工具打开`dist`目录即可预览

## Script [命令]

> `npm` 可以用 `yarn` 代替

- `npm start`: 重新编译项目并实时更新[alias `npm run start`]
- `npm test`: 测试[alias `npm run test`]
- `npm run build`: 打包编译(支持三个环境)
- `npm run clean`: 清理 dist 目录
- `npm run watch`: 仅监测文件变化实时更新(支持三个环境)
- `npm run check`: 代码风格和格式检查(支持不同语言单独`lint`检查)
- `npm run fix`: 自动修复可修复的 lint 和代码风格问题

全部快捷命令[package.json](https://github.com/NewFuture/miniprogram-template/blob/master/package.json#L12-L44)

#### Multiple [env](env) [多环境设置]

> 每个环境可进行不同配置包括 appid(可按需增加护照减少环境配置)

- `dev` 开发集成环境
- `test` 测试环境
- `prod` 线上生产环境

## Coding [编码]

所有代码均已配置语法检查与风格自动格式化, 请使用 VSCode 进行开发. (开箱即用, 已内置 VSCode 配置)

需要安装推荐的插件 (在插件栏-推荐的插件)

### git commit 格式

- 请查看 git commit 提交规范：[git commit](https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md)

### Languages [编程语言]


#### js

- `.ts`(TypeScript) 或 `.js`(JavaScript) (**推荐`ts`**)
- Eslint + Prettier 检查代码风格和自动格式化
- TS 支持`/`绝对路径形式 import

#### wxml

- `.wxml` 或 `.html`
- Htmlhit + Prettier 检查代码风格和自动格式化
- 使用 vscode-minapp 进行代码检查和格式

#### wxss

- `.scss` ,`.sass`或者`.css` (推荐`scss`)
- Stylelint + Prettier 检查代码风格和自动格式化
- `scss` 可以直接 `@import` assets 目录下内容

#### json

- `.jsonc`,`.json`或`.json5` 支持注释
- Prettier 代码检查和自动格式化

#### wxs

- `.wxts`(TypeScript),`.wxs`(JavaScript) (推荐`wxts`)
- Prettier 代码检查和自动格式化
- `miniprogram-wxs`进行 type 检查和限定

### 资源替换(image)

- 由于程序包超过了 2M 的最大限制,所以采用了分包上传,相应的图片会适当移动到对应的分包下的 1images 下面,注意替换

### Editor [编辑器]

> 使用`VSCode`,并自动安装推荐插件

1. 首次使用根据提示**自动安装推荐插件**
2. 所有插件已配置好,会自动进行代码检查提示,保存时自动修复
3. 新建 `Page`,`Component`,`wxs`会自动生产模板文件([可修改模板](.dtpl/))

## CI [持续集成]

默认已经配置完 Auzre Pipelines 和 Travis CI,可按需开启和配置

- Azure Pipelines 按需修改 [配置 azure-pipelines.yml](azure-pipelines.yml)
- Travis-CI 按需修改 [配置 .travis.yml](.travis.yml)
