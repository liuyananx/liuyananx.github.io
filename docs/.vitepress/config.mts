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
      { text: '关于', link: '/about' },
      { text: '项目', link: '/projects' },
      { text: '笔记', link: '/notes/' },
      { text: '链接', link: '/links' },
      { text: '联系', link: '/contact' }
    ],
    sidebar: {
      '/notes/': [
        {
          text: '笔记',
          items: [
            { text: '笔记目录', link: '/notes/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liuyananx/liuyananx.github.io' }
    ],
    footer: {
      message: '记录想法、作品和生活。',
      copyright: 'Copyright © 2026-present'
    },
    search: {
      provider: 'local'
    }
  }
})

