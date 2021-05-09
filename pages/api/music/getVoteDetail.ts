import type { NextApiRequest, NextApiResponse } from "next";
import sql from "../../../utils/db";

// var Mock = require("mockjs");
// const env = process.env.NODE_ENV;

type Data = {
	data?: {
		title: string;
		description: string;
		/** 0.正在进行 1.已结束 */
		statu: number;
	};
	message: string;
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

// const MOCK_DATA = Mock.mock({
//     title: '@cparagraph(1)',
//     description: '@cparagraph(15)',
//     'musics|1-8': [{
//         'id|+1': 1,
//         playUrl: "url('http', 'nuysoft.com')",
//         'name': '@string(5)'
//     }]
// })

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id: musicId } = req.query;
	const musicData = await sql.get("music_votes", ["*"], {
		where: { key: "id", value: musicId },
		limit: 1,
	});
	res.status(200).json({
		data: musicData[0],
		message: "Get successfully",
	});
};
