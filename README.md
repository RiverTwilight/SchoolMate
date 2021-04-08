<p align="center">
  <a href="#">
    <img width="180" src="https://cflsgx-mate.vercel.app/static/logo.svg">
  </a>
</p>

<h1 align="center">成高生活圈</h1>

<div align="center">

[English](./README-en.md) | 简体中文

</div>

为成都外国语学校开发的一站式校园生活服务网站。基于 Typescript + NextJS + MaterialUI + 搭建。

## 特性 | Features

- [x] 学生、管理员可一键登录账号（无需注册）
- [x] 管理员可发布起床铃投票，支持设置截止日期，到期自动关闭投票。
- [x] 学生可为起床铃待选歌曲投票（一人只能投一票），或者投稿歌曲

## 贡献 | Contribution

欢迎你提交代码。

```
npm run dev
```

### 数据库结构

使用MySql作为数据库

#### music

存放所有投票session

* **id**: session id
* **title**: 投票标题
* **deadline**: 结束日期
* **statu**: 投票状态，0为正常， 1为已结束
* **musics**: 歌曲，用JSON格式存储。statu: 0正常 1删除 2中标
```json
[
    {
        "id": 0,
        "playUrl": "...",
        "vote": 5,
        "statu": 0 
    }
]
```

#### user

存放用户信息

* id
* grade 年级
* class 班级
* name 名字
* tel 考号
* token 用户令牌，首次登陆后激活

## LICENSE

MIT.
