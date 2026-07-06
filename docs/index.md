---
layout: home

hero:
  name: My World
  text: 欢迎来到我的世界
  tagline: 随想、复盘和一些阶段记录。先写下来，再慢慢整理。
  image:
    src: /avatar.svg
    alt: lynx
  actions:
    - theme: brand
      text: 写点东西
      link: /admin
    - theme: alt
      text: 看随想
      link: /thoughts
    - theme: alt
      text: 项目总结
      link: /summaries
---

<script setup>
import HomeContent from './components/HomeContent.vue'
</script>

<HomeContent />
