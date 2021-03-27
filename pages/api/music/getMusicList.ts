import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
// var Mock = require('mockjs');
// const env = "sad" || process.env.NODE_ENV

// console.log(env)

type Data = {
	message: string;
	data?: any;
};

/**
 * 获取投票列表
 * @param {string} id 投票ID
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { id } = req.query;

		const result = await sql.get("music_votes", ["*"], {});
		// const result = env === "development" ? Mock.mock({
		//     'list|4-8': [{
		//         'id|+1': 1,
		//         'description': '@cparagraph(2)',
		//         'title': '@cparagraph(1)',
		//         'statu': '@character("01")'
		//     }]
		// }) : await sql.get('music_votes', ["*"], {})

		res.status(200).json({
			message: "获取成功",
			data: result,
		});
	} catch (err) {
		res.status(201).json({
			message: "操作失败",
		});
	}
};
