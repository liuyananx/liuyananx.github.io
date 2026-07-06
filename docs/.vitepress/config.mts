import { defineConfig } from 'vitepress'

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
      { text: '随想', link: '/thoughts', activeMatch: '^/thoughts(/|$)' },
      { text: '项目总结', link: '/summaries', activeMatch: '^/summaries(/|$)' },
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
      '/thoughts/': [
        {
          text: '随想',
          items: [
            { text: '随想目录', link: '/thoughts' }
          ]
        }
      ],
      '/summaries/': [
        {
          text: '项目总结',
          items: [
            { text: '项目总结目录', link: '/summaries' }
          ]
        }
      ]
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



