<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  emptyText: {
    type: String,
    default: '暂时还没有内容。'
  }
})
</script>

<template>
  <section class="content-list">
    <p v-if="!items.length" class="empty">{{ emptyText }}</p>

    <article v-for="item in items" :key="item.url" class="content-card">
      <a :href="item.url">
        <span v-if="item.date">{{ item.date }}</span>
        <h2>{{ item.title }}</h2>
        <p v-if="item.project" class="meta">项目：{{ item.project }}</p>
        <p v-if="item.role" class="meta">角色：{{ item.role }}</p>
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

.empty,
.content-card span,
.meta {
  color: var(--vp-c-text-2);
}

.content-card a {
  display: block;
  color: inherit;
  text-decoration: none;
}

.content-card span,
.meta {
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
  line-height: 1.7;
}

.content-card p + p {
  margin-top: 6px;
}

.content-card :deep(p) {
  color: var(--vp-c-text-2);
}
</style>
