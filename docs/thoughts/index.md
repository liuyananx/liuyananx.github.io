# 随想

这里放零散的想法、临时的念头、不成体系的记录。

<script setup>
import ContentList from '../components/ContentList.vue'
import { data as thoughts } from '../.vitepress/theme/thoughts.data'
</script>

<ClientOnly>
  <ContentList :items="thoughts" empty-text="暂时还没有随想。" />
</ClientOnly>
