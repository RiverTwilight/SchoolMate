import type { NextApiRequest, NextApiResponse } from "next";
import sql from "../../../utils/db"

var Mock = require('mockjs');
var Random = Mock.Random

type Data = {
    title: string;
    description: string;
    /** 0.正在进行 1.已结束 */
    statu: number;
    musics: {
        name: string;
        playUrl: string;
        id: number;
    }[];
};

// const MOCK_DATA = {
//     title: "dfsaf",
//     description: "大家萨格返回的是可视对讲立法规划",
//     statu: 0,
//     musics: [
//         {
//             name: "测试歌曲1",
//             playUrl: "https://www.ygktool.cn/audio/alarm.mp3",
//             id: 2,
//         },
//         {
//             name: "测试歌曲2",
//             playUrl:
//                 "https://upload.wikimedia.org/wikipedia/commons/b/b9/March_of_the_Volunteers_instrumental.ogg",
//             id: 2,
//         },
//     ],
// };

const MOCK_DATA = Mock.mock({
    title: Random.cparagraph(1),
    description: Random.cparagraph(15),
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'musics|1-8': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        playUrl: Random.url('http', 'nuysoft.com'),
        name: Random.string(5)
    }]
})

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // const musicData = await sql.get("music", "*", {
    //     where: {
    //         key: "id",
    //         value: "id",
    //     },
    // });
    // console.log(musicData)
    res.status(200).json(MOCK_DATA);
};
