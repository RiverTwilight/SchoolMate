const siteConfig = {
    title: '校园生活圈',
    root: 'https://mate.product.rene.wang',
    description: '为校园开发的一站式校园生活服务网站。',
    keywords: [],
    logo: {},
    theme: {
        primaryColor: '#1890ff',
        secondaryColor: '#1890ff',
    },
    supportAgent: [
        {
            name: 'QQ',
            url: `https://wpa.qq.com/msgrd?v=3&uin=${2621280245}&site=qq&menu=yes`,
        },
    ],
    department: [
        {
            text: '高2018级',
            value: 2018,
            class: 14,
            hidden: true,
        },
        {
            text: '高2019级',
            value: 2019,
            class: 15,
            hidden: true,
        },
        {
            text: '高2020级',
            value: 2020,
            class: 15,
            hidden: false,
        },
        {
            text: '高2021级',
            value: 2021,
            class: 15,
            hidden: false,
        },
        {
            text: '高2022级',
            value: 2022,
            class: 15,
            hidden: false,
        },
    ],
    author: {
        name: '江村暮',
        image: '/image/author.jpg',
        intro: [
            {
                title: '关于作者',
                content:
                    '一个高中生，坐标蓉城。喜欢写代码、骑车、画画，唱歌。\n\n知乎：@江村暮\n',
            },
        ],
    },
}

module.exports = siteConfig
