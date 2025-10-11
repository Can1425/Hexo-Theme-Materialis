## About 页面用法
终端执行hexo new page "about"
创建成功后，在source目录下生成about.md文件，打开文件，将内容替换为如下内容：
```markdown
---
title: about
date: 2025-10-04 09:25:56
type: about
layout: about
---
```
然后新建source/_posts/about.yml文件，将内容替换为如下内容：
```yml
# 关于页面数据配置
# 基本信息
img: "/images/avatar.jpg"
bio: "前端开发者 | 技术爱好者"
talk: "这里写你的个人介绍，可以包括你的技术背景、工作经历、兴趣爱好等。"
tags:
  - "JavaScript"
  - "Vue"
  - "React"
  - "Node.js"
  - "前端开发"

# 技能列表 (使用 SVG 图标链接)
skills:
  - name: "JavaScript"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  - name: "TypeScript"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  - name: "Vue"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
  - name: "React"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  - name: "Node.js"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  - name: "Python"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  - name: "Git"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  - name: "Docker"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"

# 社交链接
socials:
  - name: "GitHub"
    url: "https://github.com/yourusername"
    svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
  - name: "哔哩哔哩"
    url: "https://space.bilibili.com/yourid"
    svg: "/images/bilibili.svg"
  - name: "邮箱"
    url: "mailto:your-email@example.com"
    icon: "email"
  - name: "个人网站"
    url: "https://your-website.com"
    icon: "language"

# 其他链接
url: "https://your-website.com"
```
## 友情链接配置
新建页面links
在links里面替换掉内容
```markdown
---
title: links
date: 2025-10-04 18:47:34
type: friend
layout: friend
---
```
然后在创建source/_posts/links.yml文件，将内容替换为如下内容：
```yml
- name: 博客名称
  url: https://example.com
  avatar: https://example.com/avatar.jpg
  desc: 博客描述

- name: 另一个博客
  url: https://another-example.com
  avatar: https://another-example.com/avatar.jpg
  desc: 另一个博客的描述
```
## 归档页面
创建页面diary
在diary里面替换掉内容
```markdown
---
title: diary
date: 2025-10-04 19:04:54
type: diary
layout: diary
---
```
## 说说页面
创建页面shuoshuo
在shuoshuo里面替换掉内容
```markdown
---
title: shuoshuo
date: 2025-10-04 19:04:54
type: shuoshuo
layout: shuoshuo
---
## 添加说说
## 添加说说
1. 创建一个md文件，在source/_data/文件名格式为：shuoshuo.yml
2. 将内容替换为如下内容：
```yml
- id: 1
  username: "我"
  avatar: "https://blog.yizhixiaozhu.top/images/1.png"
  content: "今天天气真好，出去散步看到了美丽的夕阳！🌅"
  time: "2小时前"
  images: []
  likes: 12
  comments: 3
  liked: false

- id: 2
  username: "我"
  avatar: "https://blog.yizhixiaozhu.top/images/1.png"
  content: "分享一首好听的歌：周杰伦 - 晴天 ☀️"
  time: "昨天"
  images: []
  likes: 8
  comments: 2
  liked: true

- id: 3
  username: "我"
  avatar: "https://blog.yizhixiaozhu.top/images/1.png"
  content: "学习了一整天，终于把 Hexo 主题搞定了！💪"
  time: "2天前"
  images: []
  likes: 15
  comments: 5
  liked: false

- id: 4
  username: "我"
  avatar: "https://blog.yizhixiaozhu.top/images/1.png"
  content: "发现了一家超棒的咖啡店，推荐给大家！☕"
  time: "3天前"
  images: []
  likes: 20
  comments: 8
  liked: true
```

