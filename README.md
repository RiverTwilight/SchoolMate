<p align="center">
  <a href="#">
    <img width="180" src="https://cflsgx-mate.vercel.app/logo.svg">
  </a>
</p>

<h1 align="center">生活圈</h1>

<div align="center">

[English](./README-en.md) | 简体中文

</div>

为学校开发的一站式校园生活服务网站。简单易用。基于 Typescript + NextJS + MaterialUI + 搭建。

## 特性 | Features

-   [x] 学生、管理员可一键登录账号（无需注册）
-   [x] 管理员可发布起床铃投票，支持设置截止日期，到期自动关闭投票。
-   [x] 学生可为起床铃待选歌曲投票（一人只能投三票），或者投稿歌曲
-   [x] 投票支持解析网易云音乐
-   [-] 投票支持解析 QQ 音乐链接
-   [-] 食堂菜品投票

## 部署 | Delopyment

### 配置

在项目根目录下创建 `.env` 文件（或在托管平台的环境变量编辑页面），填入以下内容：

```env
# 管理员账号
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```

配置文件示例

```js

```

## 贡献 | Contribution

欢迎你提交代码。

```
npm run dev
```

### 用户状态码

| Code | Status |
| ---- | ------ |
| 0    | Frozen |
| 1    | Normal |
| 2    | Owner  |
| 3    | Admin  |

### 接口错误码

| errCode | Description           |
| ------- | --------------------- |
| 10001   | Login                 |
| 10004   | Need admin to operate |
