# caldey-music
使用Vue3+TS+Pinia+TailWindCSS+Element Plus开发一个简约风网易云音乐播放器，通过TailwindCSS实现了PC端和移动端的响应式布局，全局适配骨架屏优化用户体验

# 接口文档
该项目使用[网易云音乐接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/)，可参考文档部署接口，推荐使用`Vercel`进行部署\
22/09/22更新：由于Vercel被🧱，现在改用阿里云服务器部署Node服务

# 项目预览
(主要页面全部适配骨架屏，具体效果可以参考在线Demo)
<div>
  <span>首页</span>
  <img width="1340" alt="截屏2022-09-24 下午5 16 38" src="https://user-images.githubusercontent.com/56568751/192090355-d637ebaa-ee18-40df-b4ac-1fc8f3555a82.png">
</div>
<div>
  <span>排行榜</span>
  <img width="1341" alt="截屏2022-09-24 下午5 23 38" src="https://user-images.githubusercontent.com/56568751/192090674-050e169c-6468-4630-acb4-e3c008b74813.png">
</div>
<div>
  <span>歌单页</span>
  <img width="1340" alt="截屏2022-09-24 下午5 25 06" src="https://user-images.githubusercontent.com/56568751/192090708-06b3b8bf-95aa-4238-83bc-8c195789a090.png">
</div>
<div>
  <span>歌手</span>
  <img width="1340" alt="截屏2022-09-24 下午5 26 36" src="https://user-images.githubusercontent.com/56568751/192090784-ae947e49-3eae-4d01-9573-c945ae2eb4ed.png">
</div>
<div>
  <span>MV</span>
  <img width="1339" alt="截屏2022-09-24 下午5 28 06" src="https://user-images.githubusercontent.com/56568751/192090816-bcccedf4-8d07-4f28-9363-6b2a124bfb3f.png">
</div>
<div>
  <span>歌单详情</span>
  <img width="1341" alt="截屏2022-09-24 下午5 20 25" src="https://user-images.githubusercontent.com/56568751/192090491-9d5439d5-c1d9-424b-aa4b-765de70bf982.png">
</div>
<div>
  <span>歌单播放</span>
  <img width="1337" alt="截屏2022-09-24 下午5 22 05" src="https://user-images.githubusercontent.com/56568751/192090563-18e78eb3-4ce8-4ede-a7e4-6173c928675b.png">
</div>
<div>
  <span>歌词</span>
  <img width="1352" alt="截屏2022-09-24 下午5 55 58" src="https://user-images.githubusercontent.com/56568751/192091904-86fd720e-6216-47bd-885a-2c2a3f83cf34.png">
</div>
<div>
  <span>搜索</span>
  <img width="1349" alt="截屏2022-09-24 下午5 39 34" src="https://user-images.githubusercontent.com/56568751/192091259-8186cda4-abde-4522-9e97-2028ef9acf16.png">
</div>
<div>
  <span>搜索结果-歌曲</span>
  <img width="1342" alt="截屏2022-09-24 下午5 41 11" src="https://user-images.githubusercontent.com/56568751/192091338-e2539a32-cc2b-4c0f-8fb6-170bf5f87bd3.png">
</div>
<div>
  <span>歌手详情1</span>
  <img width="1337" alt="截屏2022-09-24 下午5 42 47" src="https://user-images.githubusercontent.com/56568751/192091382-af1999ca-4b13-450b-ba9d-d0589853fc61.png">
</div>
<div>
  <span>歌手详情2</span>
  <img width="1339" alt="截屏2022-09-24 下午5 43 58" src="https://user-images.githubusercontent.com/56568751/192091420-d4377395-2295-493d-b2b3-9ab3a466973d.png">
</div>
<div>
  <span>Mv详情页</span>
  <img width="1337" alt="截屏2022-09-24 下午5 45 53" src="https://user-images.githubusercontent.com/56568751/192091546-3f9bdb09-4885-435e-a931-0a2dc7c030c0.png">
</div>
<div>
  <span>Mv评论</span>
  <img width="1338" alt="截屏2022-09-24 下午5 48 27" src="https://user-images.githubusercontent.com/56568751/192091583-2f25b16a-3810-40e8-9713-cca16a1db339.png">
</div>
<div>
  <div>移动端 首页</div>
  <img width="302" alt="截屏2022-09-24 下午5 49 47" src="https://user-images.githubusercontent.com/56568751/192091652-10a83430-83ea-495d-a55e-5251f305e800.png">
</div>
<div>
  <div>移动端 歌单详情</div>
  <img width="303" alt="截屏2022-09-24 下午5 51 04" src="https://user-images.githubusercontent.com/56568751/192091713-92119e36-9b27-43b4-8756-a34771a26c09.png">
</div>
<div>
  <div>移动端 歌单评论</div>
  <img width="302" alt="截屏2022-09-24 下午5 51 51" src="https://user-images.githubusercontent.com/56568751/192091743-934b3081-d0de-4a34-8411-cd291518d098.png">
</div>
<div>
  <div>移动端 歌词</div>
  <img width="300" alt="截屏2022-09-24 下午5 52 44" src="https://user-images.githubusercontent.com/56568751/192091771-d2eee619-5d24-4138-9e8a-35bfc0ec9bcf.png">
</div>
<div>
  <div>移动端 MV</div>
  <img width="302" alt="截屏2022-09-24 下午5 54 22" src="https://user-images.githubusercontent.com/56568751/192091842-7865f31c-c66c-45cc-9496-a5855482174f.png">
</div>

# 项目运行
```
npm install
npm run dev
// 打包
npm run build
```
