# 随想

这里先不做复杂后台了。

你可以像发一条帖子一样写随想：点击下面按钮，登录 GitHub 后直接填写内容并提交。网站会自动读取带 `thought` 标签的 Issues。

<p>
  <a class="write-thought-button" href="https://github.com/liuyananx/liuyananx.github.io/issues/new?template=thought.yml" target="_blank" rel="noreferrer">
    写一条随想
  </a>
</p>

<script setup>
import IssueThoughts from '../components/IssueThoughts.vue'
</script>

<ClientOnly>
  <IssueThoughts />
</ClientOnly>
