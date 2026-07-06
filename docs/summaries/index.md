# 项目总结

这里用来放项目复盘、阶段总结、踩坑记录和工作方法沉淀。

它不一定要写得很正式，重点是把做过什么、怎么做的、有什么收获留下来。

[打开在线编辑器](https://app.pagescms.org/)

登录 GitHub 后选择仓库 `liuyananx/liuyananx.github.io`，进入“项目总结”即可新建内容。

## 可以怎么写

```md
# 某项目总结

## 背景

这个项目为什么要做？

## 我负责什么

我做了哪些模块、页面或关键工作？

## 遇到的问题

中间踩了什么坑？

## 最后的收获

下次可以怎么做得更好？
```

<script setup>
import ContentList from '../components/ContentList.vue'
import { data as summaries } from '../.vitepress/theme/summaries.data'
</script>

<ClientOnly>
  <ContentList :items="summaries" empty-text="暂时还没有项目总结。可以先从最近一个项目开始写。" />
</ClientOnly>
