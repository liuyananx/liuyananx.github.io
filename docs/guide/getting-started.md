# 快速开始

这个项目适合用来存放你自己写的文档、笔记和文章。

## 新增一篇文章

在 `docs/notes/` 下新增一个 Markdown 文件，例如：

```text
docs/notes/my-first-note.md
```

然后写入内容：

```md
# 我的第一篇笔记

这里是正文内容。
```

## 添加到侧边栏

打开 `docs/.vitepress/config.mts`，在 `sidebar` 里加入：

```ts
{ text: '我的第一篇笔记', link: '/notes/my-first-note' }
```

## 构建发布

```bash
npm run docs:build
```

构建产物会生成在：

```text
docs/.vitepress/dist
```
