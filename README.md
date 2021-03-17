<p align="center">
  <a href="#">
    <img width="180" src="https://i.loli.net/2021/03/13/3NBGFWbsQ2TRz5I.png">
  </a>
</p>

<h1 align="center">成高生活圈</h1>

<div align="center">

[English](./README-en.md) | 简体中文

</div>

为成都外国语学校开发的一站式校园生活服务网站。基于 Typescript + NextJS + MaterialUI + 搭建。

## 贡献

欢迎你提交代码。

### 数据库结构

使用MySql作为数据库

#### music

存放所有投票session

* **id**: session id
* **title**: 投票标题
* musics: 歌曲，用JSON格式存储。statu: 0正常 1删除 2中标
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
* statu: 投票状态，0为正常， 1为已结束

#### user

存放用户信息

* id
* grade 年级
* classNum 班级
* name 名字
* tel 电话
* token 用户令牌，首次登陆后激活
