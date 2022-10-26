<p align="center">
  <a href="#">
    <img width="180" src="https://cflsgx-mate.vercel.app/logo.svg">
  </a>
</p>

<h1 align="center">成高生活圈</h1>

<div align="center">

[English](./README-en.md) | 简体中文

</div>

为成都外国语学校开发的一站式校园生活服务网站。基于 Typescript + NextJS + MaterialUI + 搭建。

## 特性 | Features

-   [x] 学生、管理员可一键登录账号（无需注册）
-   [x] 管理员可发布起床铃投票，支持设置截止日期，到期自动关闭投票。
-   [x] 学生可为起床铃待选歌曲投票（一人只能投三票），或者投稿歌曲
-   [x] 投票支持解析网易云音乐
-   [-] 投票支持解析 QQ 音乐链接
-   [-] 食堂菜品投票

## 贡献 | Contribution

欢迎你提交代码。

```
npm run dev
```

### 数据库结构

#### music_votes

存放所有投票(vote)session

-   **id**: session id
-   **title**: 投票标题
-   **deadline**: 结束日期(ISO Date)
-   **createDate**: 创建日期(ISO Date)
-   **statu**: 投票状态，0 为正常， 1 为已结束

#### musics

存放上传的歌曲信息，单向映射到 music_votes

-   **statu**: 0 正常 1 删除 2 中标
-   **playUrl**: 播放链接
-   **vote**：票数
-   **voter**: 投票者 ID 组成的数组 JSON
-   **vote_id**: 对应的 session id
-   **lyrics** : 歌词
-   **reason**： 投票理由
-   **artist**: 歌手
