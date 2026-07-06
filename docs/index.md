---
layout: home

hero:
  name: My World
  text: 欢迎来到我的世界
  tagline: 这里先放随想和项目总结。不用太正式，能写就行。
  image:
    src: /avatar.svg
    alt: lynx
  actions:
    - theme: brand
      text: 写点东西
      link: https://app.pagescms.org/
    - theme: alt
      text: 随想
      link: /thoughts
    - theme: alt
      text: 项目总结
      link: /summaries
---

<script setup>
import HomeContent from './components/HomeContent.vue'
</script>

<HomeContent />
