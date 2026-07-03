# My World

这是一个用于长期存放和发布个人内容的静态站点项目，基于 VitePress，使用方式和 VuePress 很接近。

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

## 写文档

- 首页：`docs/index.md`
- 入门说明：`docs/guide/getting-started.md`
- 笔记目录：`docs/notes/README.md`

新增 Markdown 文件后，可以在 `docs/.vitepress/config.mts` 里配置导航和侧边栏。

## 推送到 GitHub

确认你的 GitHub 仓库地址后，可以执行：

```bash
git init
git add .
git commit -m "init docs site"
git branch -M main
git remote add origin <你的 GitHub 仓库地址>
git push -u origin main
```

