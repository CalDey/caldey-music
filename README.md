# caldey-music
使用Vue3+TS+Pinia+TailWindCSS+Element Plus开发一个简约风格的响应式音乐播放网站，通过TailwindCSS实现了PC端/移动端响应式布局，全局适配骨架屏

# 接口文档
该项目使用[网易云音乐接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/)，可参考文档部署接口，推荐使用`Vercel`进行部署\
`如果卡在骨架屏没有加载出数据，说明接口被🧱了，挂🪜可以正常访问`

# 在线预览Demo
http://182.92.202.161:3003/#/

# 项目预览
(目前所有页面全部适配骨架屏，具体效果可以参考在线Demo)
<div>
  <img width="1362" alt="截屏2022-05-10 下午4 50 00" src="https://user-images.githubusercontent.com/56568751/167588953-99ba3b5a-c95b-4813-9f59-97095ccae7a0.png">
  <span>首页</span>
</div>
<div>
  <img width="1354" alt="截屏2022-05-10 下午4 53 21" src="https://user-images.githubusercontent.com/56568751/167589747-e5635ef2-b4bd-4a36-8640-04d41fc728ff.png">
  <span>首页骨架屏</span>
</div>
<div>
  <img width="1366" alt="截屏2022-05-10 下午4 56 26" src="https://user-images.githubusercontent.com/56568751/167590312-424f8f7d-22f8-4694-b97a-6ece19fee2f2.png">
  <span>歌单详情</span>
</div>
<div>
  <img width="1361" alt="截屏2022-05-10 下午4 57 32" src="https://user-images.githubusercontent.com/56568751/167590584-8d1a579a-f7c6-4419-9bc7-ce5c963fd2d4.png">
  <span>歌单详情</span>
</div>
<div>
  <img width="303" alt="截屏2022-05-10 下午4 59 51" src="https://user-images.githubusercontent.com/56568751/167591043-9d448b86-b3b5-4c27-90fe-af04a2de081b.png">
  <div>移动端 首页</div>
</div>
<div>
  <img width="299" alt="截屏2022-05-10 下午5 00 42" src="https://user-images.githubusercontent.com/56568751/167591229-9d15c089-15e2-4b14-9f7a-318280710922.png">
  <div>移动端 歌单详情</div>
</div>
<div>
  <img width="1430" alt="截屏2022-05-31 下午2 15 40" src="https://user-images.githubusercontent.com/56568751/171105551-98681bd4-d0b1-4a22-a133-aceb1126bbb2.png">
  <div>PC端 歌词</div>
</div>
<div>
  <img width="294" alt="截屏2022-05-31 下午2 16 01" src="https://user-images.githubusercontent.com/56568751/171105620-050c3df5-27d8-4d11-b3b8-ba69553dff07.png">
  <div>移动端 歌词</div>
</div>

# 说明
该项目还处于开发阶段，demo可能存在部分bug，全部功能开发完毕后会进行统一修复

# 更新日志
22/05/31 - 新增歌词功能，修复部分样式bug

# 项目运行
```
yarn install
yarn run dev
```
