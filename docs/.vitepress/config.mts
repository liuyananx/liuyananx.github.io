import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My World',
  description: '我的个人空间',
  lang: 'zh-CN',
  base: '/',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'My World',
    nav: [
      { text: '首页', link: '/' },
      { text: '近况', link: '/now' },
      { text: '东西', link: '/things' },
      { text: '笔记', link: '/notes' },
      { text: '随想', link: '/thoughts' },
      { text: '归档', link: '/archive' },
      { text: '关于', link: '/about' },
      { text: '链接', link: '/links' }
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
      '/thoughts/': [
        {
          text: '随想',
          items: [
            { text: '随想目录', link: '/thoughts' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liuyananx/liuyananx.github.io' }
    ],
    footer: {
      message: '一个不断变化的个人空间。',
      copyright: 'Copyright © 2026-present'
    },
    search: {
      provider: 'local'
    }
  }
})


