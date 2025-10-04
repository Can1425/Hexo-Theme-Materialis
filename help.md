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
name: "你的名字"
bio: "一名充满热情的前端开发者，专注于创造优秀的用户体验"
avatar: "/images/avatar.jpg"

# 个性标签
tags:
  - "前端开发"
  - "技术博客"
  - "开源爱好者"
  - "摄影"
  - "旅行"

# 统计数据
stats:
  - label: "文章数量"
    value: "128"
  - label: "项目数量"
    value: "24"
  - label: "学习时长"
    value: "3年+"
  - label: "粉丝数量"
    value: "1.2K"

# 内容区块
sections:
  - title: "关于我"
    content: |
      <p>欢迎来到我的个人空间！我是一名充满热情的前端开发者，专注于创造优雅且用户友好的Web体验。</p>
      <p>在日常工作中，我热衷于探索新技术，解决复杂问题，并将最佳实践应用于实际项目中。</p>
      <p>我相信持续学习和分享是成长的关键，因此我创建了这个博客来记录我的学习历程和技术见解。</p>

  - title: "我的理念"
    content: |
      <p><strong>代码质量</strong> - 编写可维护、可测试的代码是我的首要原则</p>
      <p><strong>用户体验</strong> - 始终以用户为中心，创造直观易用的界面</p>
      <p><strong持续学习</strong> - 技术在不断演进，保持学习是必不可少的</p>
      <p><strong>开源精神</strong> - 分享知识，回馈社区</p>

# 技能专长
# 在 _data/about.yml 中更新技能部分
skills:
  - category: "前端技术"
    icon: "code"
    items:
      - name: "Vue.js / React"
        level: 90
      - name: "TypeScript"
        level: 85
      - name: "HTML5 / CSS3"
        level: 95
      - name: "Webpack / Vite"
        level: 80
      - name: "移动端开发"
        level: 85

  - category: "后端技术"
    icon: "storage"
    items:
      - name: "Node.js"
        level: 75
      - name: "Python"
        level: 70
      - name: "MySQL / MongoDB"
        level: 80
      - name: "Redis"
        level: 65
      - name: "Docker"
        level: 70

  - category: "工具 & 其他"
    icon: "build"
    items:
      - name: "Git"
        level: 90
      - name: "Linux"
        level: 75
      - name: "UI/UX设计"
        level: 60
      - name: "项目管理"
        level: 70
      - name: "团队协作"
        level: 85
# 工作经历
experience:
  - period: "2020年 - 至今"
    position: "高级前端工程师"
    company: "ABC科技有限公司"
    description: "负责公司核心产品的前端架构设计和开发，带领团队完成多个重要项目"

  - period: "2018年 - 2020年"
    position: "前端开发工程师"
    company: "xxx公司"
    description: "搭建xx项目"

# 社交链接
social_links:
  - name: "GitHub"
    url: "https://github.com/yourusername"
    icon: "code"

  - name: "WeChat"
    url: "" #替换成图片
    icon: "chat"

  - name: "bilibili"
    url: "https://bilibili.com/"
    icon: "tv"

  - name: "邮箱"
    url: "mailto:your-email@example.com"
    icon: "mail"

# 联系信息
contact:
  - type: "电子邮箱"
    value: "your-email@example.com"
    icon: "mail"

  - type: "所在地"
    value: "中国 · 北京"
    icon: "location_on"

  - type: "工作时间"
    value: "周一至周五 9:00-18:00"
    icon: "schedule"
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
