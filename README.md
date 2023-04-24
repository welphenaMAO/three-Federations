# THREE-FEDERATIONS + mini-program (typescript version)

ThinkSNS+ 小程序, 使用 TypeScript 构建, 含更完善的小程序 Types 和 ThinkSNS Types 定义.

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

## 坑

## 自定义组件中不能应用全局样式的问题（如 app.wxss / iconfont.wxss）

**解决办法：在组件的 `.styl` 文件中，在头部加入 `@import '../../iconfont.css'`**

原理

stylus 编译时会保留 @import css 字面量，gulp 会寻找 `@import 'xxx.css'` 将其替换为 `@import 'xxx.wxss'` 以支持小程序方式导入样式

然后就可以愉快的在组件中使用全局样式啦！

## 微信开发者工具在 Mac 上无法编译的问题

**解决办法：关闭自定义编译前命令选项**，因为本项目使用 gulp 自动构建，无需该选项

 在 Mac 上执行编译前命令时，会找不到环境变量。

    正在执行自定义编译前命令...
    env: node: No such file or directory

根据官方介绍，

> 2. Mac 版本的开发者工具无法复用 bash 中的 Path 环境变量。可能需要手动设置系统的 Path 环境变量，才能正常执行命令。

然而并不知道如何手动设置环境变量，临时解决办法，直接使用你本地的 node 启动相应的文件。

```sh
/Users/welphenAmao/.nvm/versions/node/v10.15.3/bin/node ./node_modules/typescript/lib/tsc.js
```

## button 组件无法去除边框及圆角的问题

在 `button` 中设置以下内容时还是有边框和圆角出现。

```css
button {
  border: none;
  border-radius: 0;
}
```

**解决办法:**

```css
button {
  border: none;
  border-raidus: 0;
}
button::after {
  border: none;
  border-raidus: 0;
}
```

## 小程序中无法使用 wxss @keyframes 关键字的问题

是因为微信开发者工具中的样式自动补全问题，会加入 `-moz-` 前缀导致显示错误。

**解决办法：** 关闭开发者工具中的 “上传代码时样式自动补全”，并且使用自己的 autoprefixer 工具进行打包

## 小程序中的官方组件 scroll-view 加上 position:fixed(可视窗口定位)后滚动失效

原因暂时不祥，网友提供资料是微信小程序的 BUG，会导致 page 吃掉带 fixed 的 scroll-view 的滚动事件

**解决办法：**将 scroll-view 替换成 view，加上样式 verflow-x（y）:scroll;就可以滑动了，记得设置滑动方向的具体宽（高）度
