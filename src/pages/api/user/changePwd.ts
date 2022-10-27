import db from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import verifyJWT from "@/utils/verifyJWT";

type Data = {
	message: string;
	deleteId?: string;
};

export type ChangePwdReqBody = {
	oldPwd: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { oldPwd } = req.query as ChangePwdReqBody;

		const { TOKEN: token } = req.cookies;

		const userData = verifyJWT(token);

		if (!!!userData) {
			return res.status(200).json({
				message: "TOKEN无效",
			});
		}

		await db.music.update({
			data: {
				status: 1,
			},
			where: {
				id: musicId,
			},
		});

		return res.status(200).json({
			message: "删除成功",
			deleteId: musicId,
		});
	} catch (err) {
		res.status(201).json({
			message: "投票失败：服务器错误",
		});
	}
};
