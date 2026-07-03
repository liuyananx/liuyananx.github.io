import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My World',
  description: '我的个人空间',
  lang: 'zh-CN',
  base: '/my-world/',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '笔记', link: '/notes/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' }
          ]
        }
      ],
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
      { icon: 'github', link: 'https://github.com/liuyananx/my-world' }
    ],
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026-present'
    },
    search: {
      provider: 'local'
    }
  }
})

