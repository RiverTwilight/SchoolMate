import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

/**
 * 创建投票
 * @param {string} id 投票ID
 * @param {string} userID 用户ID
 * @param {string} token 用户TOKEN
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { title, deadline, description } = req.body;
		console.log(JSON.parse(req.body));

		// TODO 验证是否为管理员

		const add = await sql.insert("music", {
			title,
			deadline,
		});

		res.status(200).json({
			message: "投票已结束",
		});
	} catch (err) {
		res.status(201).json({
			message: "操作失败",
		});
	}
};
