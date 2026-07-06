import { createContentLoader } from 'vitepress'

export interface ThoughtItem {
  title: string
  url: string
  date: string
  excerpt: string
}

export default createContentLoader('thoughts/*.md', {
  excerpt: true,
  transform(raw): ThoughtItem[] {
    return raw
      .filter((item) => !item.url.endsWith('/thoughts/'))
      .map((item) => ({
        title: item.frontmatter.title || '未命名',
        url: item.url,
        date: formatDate(item.frontmatter.date),
        excerpt: item.excerpt || ''
      }))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  }
})

function formatDate(value: unknown) {
  if (!value) return ''
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toISOString().slice(0, 10)
}
