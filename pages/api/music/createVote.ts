import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	/**
	 * 新的投票ID
	 */
	id?: unknown;
	message: string;
};

/**
 * 创建投票
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { musics, title, deadline, description } = JSON.parse(req.body);

		const { token } = req.cookies;

		// TODO 验证是否为管理员

		const add = await sql.insert("music_votes", {
			title,
			deadline,
			musics,
			description,
		});

		res.status(200).json({
			message: "创建成功",
			id: add.insertId,
        });
        
	} catch (err) {
		res.status(301).json({
			message: err,
		});
	}
};
