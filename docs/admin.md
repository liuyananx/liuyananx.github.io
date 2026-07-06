---
title: 写作后台
editLink: false
lastUpdated: false
head:
  - - meta
    - name: robots
      content: noindex,nofollow
---

# 写作后台

这里是一个轻量在线编辑入口，用来写“随想”和“笔记”。

它会直接把 Markdown 文件提交到 GitHub 仓库，提交后 GitHub Pages 会自动部署。

::: warning
请使用只授权当前仓库的 fine-grained GitHub Token。不要使用权限过大的长期 Token，也不要把 Token 发给别人。
:::

<script setup>
import AdminEditor from './components/AdminEditor.vue'
</script>

<ClientOnly>
  <AdminEditor />
</ClientOnly>
