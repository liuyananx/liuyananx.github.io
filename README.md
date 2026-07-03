# My World

这是一个个人网站项目，基于 VitePress，可以用来展示个人介绍、项目作品、文章笔记和常用链接。

## 本地使用

```bash
npm install
npm run docs:dev
```

默认会启动一个本地预览服务，浏览器打开终端提示的地址即可查看。

## 常用命令

```bash
npm run docs:dev      # 本地写作预览
npm run docs:build    # 构建静态站点
npm run docs:preview  # 预览构建产物
```

## 写内容

- 首页：`docs/index.md`
- 关于我：`docs/about.md`
- 项目作品：`docs/projects.md`
- 笔记目录：`docs/notes/README.md`
- 常用链接：`docs/links.md`

新增 Markdown 文件后，可以在 `docs/.vitepress/config.mts` 里配置导航和侧边栏。

## GitHub Pages

当前仓库用于 GitHub Pages 个人站点：

```text
https://liuyananx.github.io
```

