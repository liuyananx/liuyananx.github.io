# 随想

这里放零散的想法、临时的念头、不成体系的记录。

想在线写内容，可以用 Pages CMS：

[打开在线编辑器](https://app.pagescms.org/)

登录 GitHub 后选择仓库 `liuyananx/liuyananx.github.io`，进入“随想”即可新建内容。

<script setup>
import ContentList from '../components/ContentList.vue'
import { data as thoughts } from '../.vitepress/theme/thoughts.data'
</script>

<ClientOnly>
  <ContentList :items="thoughts" empty-text="暂时还没有随想。可以先去在线编辑器写第一条。" />
</ClientOnly>
