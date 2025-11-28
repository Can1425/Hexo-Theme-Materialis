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
name: "你的名字"
title: "前端开发者 & 博主"
description: "这里写关于我的详细介绍，可以写多行文字..."

skills:
  - "JavaScript"
  - "HTML/CSS"
  - "Vue.js"
  - "React"
  - "Node.js"
  - "Python"

contacts:
  - name: "GitHub"
    icon: "code"
    link: "https://github.com/yourname"
  - name: "邮箱"
    icon: "email"
    link: "mailto:your@email.com"
  - name: "微博"
    icon: "chat"
    link: "https://weibo.com/yourname"

projects:
  - name: "个人博客系统"
    description: "基于 Hexo 搭建的个人博客，支持自定义主题和插件"
    link: "https://github.com/yourname/blog"
  - name: "在线工具集合"
    description: "开发的各种实用在线工具，包括图片处理、代码格式化等"
    link: "https://tools.yoursite.com"
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
## 分类页面
创建页面categories
在categories里面替换掉内容
```markdown
---
title: categories
date: 2025-10-04 19:04:54
type: categories
layout: categories
---
```
## 标签页面
创建页面tags
在tags里面替换掉内容
```markdown
---
title: tags
date: 2025-10-04 19:04:54
type: tags
layout: tags
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
1. 创建一个md文件，在source/_data/文件名格式为：talks.yml
2. 将内容替换为如下内容：
```yml
# 说说数据配置
talks:
  - date: "2024-01-15 14:30"
    author: "测试"
    avatar: "/images/avatar.jpg"  # 可选，不填使用默认头像
    content: "测试"

# 配置说明
# date: 发布时间 (格式: YYYY-MM-DD HH:mm)
# author: 作者 (可选，默认使用 config.author)
# avatar: 头像链接 (可选)
# content: 说说内容
# images: 图片列表 (可选)
```

