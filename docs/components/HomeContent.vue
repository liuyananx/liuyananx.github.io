<script setup>
import { computed } from 'vue'
import { data as thoughts } from '../.vitepress/theme/thoughts.data'
import { data as summaries } from '../.vitepress/theme/summaries.data'

const recentItems = computed(() => {
  return [
    ...thoughts.map((item) => ({ ...item, type: '随想' })),
    ...summaries.map((item) => ({ ...item, type: '项目总结' }))
  ]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 5)
})
</script>

<template>
  <div class="home-content">
    <section class="home-panel">
      <div class="panel-title">
        <span>导航</span>
        <h2>去对应模块</h2>
      </div>

      <div class="entry-grid">
        <a class="entry-card" href="/thoughts">
          <span>01</span>
          <h3>随想</h3>
          <p>零散想法、日常状态，先放在这里。</p>
        </a>

        <a class="entry-card" href="/summaries">
          <span>02</span>
          <h3>项目总结</h3>
          <p>复盘项目，记录过程、问题和收获。</p>
        </a>

        <a class="entry-card" href="/about">
          <span>03</span>
          <h3>关于</h3>
          <p>放一些关于我和这个空间的说明。</p>
        </a>

        <a class="entry-card" href="/links">
          <span>04</span>
          <h3>链接</h3>
          <p>常用入口、朋友网站或值得保存的地方。</p>
        </a>
      </div>
    </section>

    <section class="home-panel">
      <div class="panel-title">
        <span>最近</span>
        <h2>最近更新</h2>
      </div>

      <div v-if="recentItems.length" class="recent-list">
        <a v-for="item in recentItems" :key="item.url" class="recent-item" :href="item.url">
          <small>{{ item.type }}<template v-if="item.date"> · {{ item.date }}</template></small>
          <strong>{{ item.title }}</strong>
          <p v-if="item.excerpt" v-html="item.excerpt" />
        </a>
      </div>

      <p v-else class="empty-text">暂时还没有内容。先写一条随想就行。</p>
    </section>
  </div>
</template>

<style scoped>
.home-content {
  max-width: 1152px;
  margin: 0 auto;
  padding: 12px 24px 56px;
}

.home-panel + .home-panel {
  margin-top: 28px;
}

.panel-title {
  margin-bottom: 16px;
}

.panel-title span {
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.panel-title h2 {
  margin: 6px 0 0;
  font-size: 26px;
  line-height: 1.25;
}

.entry-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.entry-card,
.recent-item,
.empty-text {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 88%, transparent);
}

.entry-card,
.recent-item {
  display: block;
  color: inherit;
  text-decoration: none;
}

.entry-card {
  padding: 20px;
}

.entry-card > span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.entry-card h3 {
  margin: 16px 0 8px;
  font-size: 18px;
}

.entry-card p,
.recent-item p,
.empty-text {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.entry-card p {
  margin: 0;
}

.recent-list {
  display: grid;
  gap: 12px;
}

.recent-item {
  padding: 18px 20px;
}

.recent-item small {
  color: var(--vp-c-text-2);
}

.recent-item strong {
  display: block;
  margin-top: 6px;
  font-size: 18px;
}

.recent-item p {
  margin: 8px 0 0;
}

.entry-card:hover,
.recent-item:hover {
  border-color: var(--vp-c-brand-2);
}

.empty-text {
  margin: 0;
  padding: 18px 20px;
}

@media (max-width: 960px) {
  .entry-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .entry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
