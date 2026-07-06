<script setup>
import { computed, ref, watch } from 'vue'

const owner = 'liuyananx'
const repo = 'liuyananx.github.io'
const branch = 'main'

const token = ref('')
const type = ref('thoughts')
const title = ref('')
const slug = ref('')
const body = ref('')
const status = ref('')
const error = ref('')
const isPublishing = ref(false)

const typeOptions = {
  thoughts: {
    label: '随想',
    dir: 'docs/thoughts',
    indexPath: 'docs/thoughts/index.md',
    linkPrefix: '/thoughts',
    placeholder: '今天突然想到……'
  },
  notes: {
    label: '笔记',
    dir: 'docs/notes',
    indexPath: 'docs/notes/index.md',
    linkPrefix: '/notes',
    placeholder: '这篇笔记想记录……'
  }
}

const today = computed(() => new Date().toLocaleDateString('zh-CN'))
const target = computed(() => typeOptions[type.value])
const filename = computed(() => {
  const safeSlug = normalizeSlug(slug.value || title.value)
  return `${safeSlug || buildDateSlug()}.md`
})
const filePath = computed(() => `${target.value.dir}/${filename.value}`)
const pageUrl = computed(() => `${target.value.linkPrefix}/${filename.value.replace(/\.md$/, '')}`)

watch(title, (value) => {
  if (!slug.value.trim()) {
    slug.value = normalizeSlug(value)
  }
})

function normalizeSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function buildDateSlug() {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`
}

function toBase64(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  const chunkSize = 0x8000

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(index, index + chunkSize))
  }

  return btoa(binary)
}

function fromBase64(value) {
  const binary = atob(value.replace(/\s/g, ''))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function apiHeaders() {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token.value.trim()}`,
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
}

async function githubRequest(path, options = {}) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}${path}`, {
    ...options,
    headers: {
      ...apiHeaders(),
      ...(options.headers || {})
    }
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    const message = data?.message || response.statusText
    throw new Error(`${response.status} ${message}`)
  }

  return data
}

async function fetchFile(path) {
  return githubRequest(`/contents/${encodeURIComponentPath(path)}?ref=${branch}`)
}

function encodeURIComponentPath(path) {
  return path.split('/').map(encodeURIComponent).join('/')
}

function buildMarkdown() {
  const normalizedTitle = title.value.trim() || '未命名'
  const normalizedBody = body.value.trim() || '这里还没有写正文。'

  return `# ${normalizedTitle}

${today.value}

${normalizedBody}
`
}

function insertEntry(indexContent) {
  const label = title.value.trim() || filename.value.replace(/\.md$/, '')
  const entry = `- [${label}](${pageUrl.value}) - ${today.value}`
  const start = '<!-- entries:start -->'
  const end = '<!-- entries:end -->'

  if (!indexContent.includes(start) || !indexContent.includes(end)) {
    return `${indexContent.trim()}

${start}
${entry}
${end}
`
  }

  const before = indexContent.slice(0, indexContent.indexOf(start) + start.length)
  const after = indexContent.slice(indexContent.indexOf(end))
  const current = indexContent
    .slice(indexContent.indexOf(start) + start.length, indexContent.indexOf(end))
    .trim()

  const nextEntries = !current || current.includes('暂时还没有')
    ? entry
    : `${entry}
${current}`

  return `${before}
${nextEntries}
${after}`
}

async function publish() {
  error.value = ''
  status.value = ''

  if (!token.value.trim()) {
    error.value = '请先填写 GitHub Token。'
    return
  }

  if (!title.value.trim()) {
    error.value = '请先填写标题。'
    return
  }

  isPublishing.value = true

  try {
    status.value = '检查文件是否已存在……'

    try {
      await fetchFile(filePath.value)
      throw new Error(`文件已存在：${filePath.value}。请换一个文件名。`)
    } catch (existingError) {
      if (!String(existingError.message).startsWith('404')) {
        throw existingError
      }
    }

    status.value = '创建 Markdown 文件……'
    await githubRequest(`/contents/${encodeURIComponentPath(filePath.value)}`, {
      method: 'PUT',
      body: JSON.stringify({
        branch,
        message: `add ${target.value.label}: ${title.value.trim()}`,
        content: toBase64(buildMarkdown())
      })
    })

    status.value = '更新目录……'
    const indexFile = await fetchFile(target.value.indexPath)
    const indexContent = fromBase64(indexFile.content)
    const updatedIndex = insertEntry(indexContent)

    await githubRequest(`/contents/${encodeURIComponentPath(target.value.indexPath)}`, {
      method: 'PUT',
      body: JSON.stringify({
        branch,
        message: `update ${target.value.label} index`,
        content: toBase64(updatedIndex),
        sha: indexFile.sha
      })
    })

    status.value = `发布完成。稍等一会儿后可以访问：${pageUrl.value}`
    title.value = ''
    slug.value = ''
    body.value = ''
  } catch (publishError) {
    error.value = publishError.message || String(publishError)
  } finally {
    isPublishing.value = false
  }
}
</script>

<template>
  <div class="admin-editor">
    <div class="admin-card">
      <label>
        <span>GitHub Token</span>
        <input
          v-model="token"
          type="password"
          autocomplete="off"
          placeholder="粘贴 fine-grained token，仅当前页面使用"
        >
      </label>

      <div class="admin-help">
        Token 需要只授权 <code>liuyananx/liuyananx.github.io</code>，权限选择
        <code>Contents: Read and write</code>。
      </div>
    </div>

    <div class="admin-card">
      <label>
        <span>类型</span>
        <select v-model="type">
          <option value="thoughts">随想</option>
          <option value="notes">笔记</option>
        </select>
      </label>

      <label>
        <span>标题</span>
        <input v-model="title" type="text" placeholder="比如：今天的一点想法">
      </label>

      <label>
        <span>文件名</span>
        <input v-model="slug" type="text" placeholder="自动生成，也可以自己改">
      </label>

      <p class="admin-path">
        将保存到：<code>{{ filePath }}</code>
      </p>

      <label>
        <span>正文</span>
        <textarea
          v-model="body"
          rows="14"
          :placeholder="target.placeholder"
        />
      </label>

      <button type="button" :disabled="isPublishing" @click="publish">
        {{ isPublishing ? '发布中……' : '发布到网站' }}
      </button>

      <p v-if="status" class="admin-status">{{ status }}</p>
      <p v-if="error" class="admin-error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.admin-editor {
  display: grid;
  gap: 20px;
}

.admin-card {
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg-soft);
}

label {
  display: grid;
  gap: 8px;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  padding: 11px 12px;
  color: var(--vp-c-text-1);
  font: inherit;
  font-weight: 400;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  outline: none;
}

textarea {
  resize: vertical;
  line-height: 1.7;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent);
}

button {
  width: fit-content;
  padding: 10px 18px;
  color: white;
  font-weight: 700;
  border: 0;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-help,
.admin-path,
.admin-status,
.admin-error {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.admin-status {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.admin-error {
  color: #ef4444;
  font-weight: 700;
}
</style>
