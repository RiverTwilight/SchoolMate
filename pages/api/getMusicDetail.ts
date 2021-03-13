import type { NextApiRequest, NextApiResponse } from "next";

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

const MOCK_DATA = {
	title: "dfsaf",
	description: "大家萨格返回的是可视对讲立法规划",
	statu: 0,
	musics: [
		{
			name: "测试歌曲1",
			playUrl: "https://www.ygktool.cn/audio/alarm.mp3",
			id: 2,
		},
		{
			name: "测试歌曲2",
			playUrl:
				"https://upload.wikimedia.org/wikipedia/commons/b/b9/March_of_the_Volunteers_instrumental.ogg",
			id: 2,
		},
	],
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
	res.status(200).json(MOCK_DATA);
};
