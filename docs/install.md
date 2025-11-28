# Hexo 安装
本主题需要 Hexo 环境支持，若你还没有安装 Hexo，请先参考 [Hexo 官方文档](https://hexo.io/zh-cn/docs/) 进行安装。
# 主题安装
你有两种安装方式：
## 方式一：通过 Git 安装
在你的Hexo博客根目录下执行以下命令：
``` bash
cd themes
git clone https://github.com/Can1425/Hexo-Theme-Materialis.git
```
##  方式二：通过 npm 安装
在你的Hexo根目录下执行以下命令：
``` bash
npm install hexo-theme-materialis
```
npm 安装后将不会在themes目录下生成，请在node_modules目录下找到主题文件。复制到themes目录下
## 主题启用
在_config.yml文件中修改theme: materialis
现在在你的Hexo根目录下执行
``` bash
hexo clean
hexo generate
hexo server
```
查看你的博客是不是已经启用了Materialis主题。
恭喜你成功安装了本主题！
