<script setup>
import { onMounted, ref } from 'vue'

const issues = ref([])
const loading = ref(true)
const error = ref('')

function formatDate(value) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(value))
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function renderBody(value = '') {
  return escapeHtml(value)
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
}

onMounted(async () => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/liuyananx/liuyananx.github.io/issues?state=open&labels=thought&sort=created&direction=desc&per_page=30',
      {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`读取失败：${response.status}`)
    }

    const data = await response.json()
    issues.value = data.filter((item) => !item.pull_request)
  } catch (issueError) {
    error.value = issueError.message || String(issueError)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="issue-thoughts">
    <p v-if="loading" class="muted">正在读取随想……</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else-if="!issues.length" class="muted">暂时还没有随想。点上面的按钮写第一条吧。</p>

    <article v-for="issue in issues" :key="issue.id" class="thought-card">
      <header>
        <h2>{{ issue.title }}</h2>
        <a :href="issue.html_url" target="_blank" rel="noreferrer">
          {{ formatDate(issue.created_at) }}
        </a>
      </header>
      <div class="thought-body" v-html="renderBody(issue.body || '')" />
    </article>
  </section>
</template>

<style scoped>
.issue-thoughts {
  display: grid;
  gap: 18px;
  margin-top: 24px;
}

.thought-card {
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg-soft);
}

.thought-card header {
  display: flex;
  gap: 12px;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
}

.thought-card h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 20px;
}

.thought-card a,
.muted {
  color: var(--vp-c-text-2);
}

.thought-body :deep(p) {
  margin: 10px 0 0;
  line-height: 1.8;
}

.error {
  color: #ef4444;
  font-weight: 700;
}

@media (max-width: 640px) {
  .thought-card header {
    display: block;
  }
}
</style>
