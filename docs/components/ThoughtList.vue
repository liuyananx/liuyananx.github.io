<script setup>
import { data as thoughts } from '../.vitepress/theme/thoughts.data'
</script>

<template>
  <section class="content-list">
    <p v-if="!thoughts.length" class="empty">
      暂时还没有随想。可以先去在线编辑器写第一条。
    </p>

    <article v-for="item in thoughts" :key="item.url" class="content-card">
      <a :href="item.url">
        <span v-if="item.date">{{ item.date }}</span>
        <h2>{{ item.title }}</h2>
        <p v-if="item.excerpt" v-html="item.excerpt" />
      </a>
    </article>
  </section>
</template>

<style scoped>
.content-list {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

.empty,
.content-card {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg-soft);
}

.empty {
  color: var(--vp-c-text-2);
}

.content-card a {
  display: block;
  color: inherit;
  text-decoration: none;
}

.content-card span {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.content-card h2 {
  margin: 8px 0;
  padding: 0;
  border: 0;
  font-size: 20px;
}

.content-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}
</style>
