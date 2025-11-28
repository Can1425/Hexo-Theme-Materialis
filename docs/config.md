# 配置
我在以下内容中，将Hexo配置文件（_config.yml）称为框架配置，将主题配置文件（_config.materialis.yml）称为主题配置文件。这二者有很大区别，请您区分。
请将本主题的配置文件移动到Hexo根目录下，并命名为_config.materialis.yml
# 站点信息配置
本主题的标题，语言等配置项依赖于框架配置文件，因此需要您填写。
```yml
title: Hexo 
subtitle: ''
description: ''
keywords:
author: John Doe
language: zh-CN
timezone: ''
```
在第一项中，为您的站点标题，第二项为副标题，第三项为站点描述，第四项为关键词，第五项为作者名称，第六项为语言，第七项为时区。
## 语言
语言项填写'zh-CN'，即可设置为中文简体。
语言项填写'zh-TW'，即可设置为中文繁体。
语言项填写'en'，即可设置为英文。
语言项填写'ja'，即可设置为日语。
语言项填写'ko'，即可设置为韩语。
语言项填写'fr'，即可设置为法语。
语言项填写'it'，即可设置为意大利语。
本主题暂时仅支持以上语言。
# 站点配置
## 侧边栏
```yml
sidebar:
  # 用户信息
  name: "system:error"
  slogen: "长风破浪会有时，直挂云帆济沧海。"
  avatar: "https://blog.yizhixiaozhu.top/images/1.png"
```
此项为配置侧边栏上的用户信息，头像配置请在 source/images 文件夹内放置一张图片，并填写图片名。
```yml
nav:
  - name: "首页"
    icon: "home"
    url: "/"
    
  - name: "文章归档"
    icon: "article"
    url: "/diary/"
    
  - name: "分类"
    icon: "category"
    url: "/categories/"
    
  - name: "标签"
    icon: "tag"
    url: "/tags/"
    
  - name: "关于"
    icon: "person"
    url: "/about/"

  - name: "友链"
    icon: "link"
    url: "/links/"

  - name: "说说"
    icon: "chat"
    url: "/shuoshuo/"
```
配置项说明：
- name：导航项名称
- icon：导航项图标，参考MDUI图标库
- url：导航项链接

