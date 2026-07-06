import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function getFrontmatterValue(content: string, key: string) {
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatter) return ''

  const line = frontmatter[1]
    .split('\n')
    .find((item) => item.startsWith(`${key}:`))

  return line?.replace(`${key}:`, '').trim().replace(/^['"]|['"]$/g, '') || ''
}

function createContentSidebar(section: string, title: string, indexText: string): DefaultTheme.SidebarItem[] {
  const dir = resolve(docsRoot, section)
  const items = existsSync(dir)
    ? readdirSync(dir)
        .filter((file) => file.endsWith('.md') && file !== 'index.md')
        .map((file) => {
          const content = readFileSync(resolve(dir, file), 'utf-8')
          const slug = basename(file, '.md')

          return {
            text: getFrontmatterValue(content, 'title') || slug,
            link: `/${section}/${slug}`,
            date: getFrontmatterValue(content, 'date')
          }
        })
        .sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.text.localeCompare(b.text, 'zh-CN'))
        .map(({ text, link }) => ({ text, link }))
    : []

  return [
    {
      text: title,
      items: [
        { text: indexText, link: `/${section}/` },
        ...items
      ]
    }
  ]
}

export default defineConfig({
  title: 'My World',
  description: '欢迎来到我的世界',
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,
  ignoreDeadLinks: [
    '/admin',
    '/notes',
    '/thoughts',
    '/summaries',
    '/things',
    '/archive',
    '/now'
  ],
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'My World',
    nav: [
      { text: '首页', link: '/', activeMatch: '^/$' },
      { text: '随想', link: '/thoughts/', activeMatch: '^/thoughts(/|$)' },
      { text: '项目总结', link: '/summaries/', activeMatch: '^/summaries(/|$)' },
      { text: '关于', link: '/about', activeMatch: '^/about(/|$)' },
      { text: '链接', link: '/links', activeMatch: '^/links(/|$)' }
    ],
    sidebar: {
      '/notes/': [
        {
          text: '笔记',
          items: [
            { text: '笔记目录', link: '/notes' }
          ]
        }
      ],
      '/thoughts/': createContentSidebar('thoughts', '随想', '全部随想'),
      '/summaries/': createContentSidebar('summaries', '项目总结', '全部项目总结')
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liuyananx/liuyananx.github.io' }
    ],
    footer: {
      message: '欢迎来到我的世界。',
      copyright: 'Copyright © 2026-present'
    },
    search: {
      provider: 'local'
    }
  }
})



