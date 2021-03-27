import sql from "../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
	user?: unknown;
};

/**
 * 登录
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token } = req.cookies;
    
	if (!!!token) {
		res.status(205).json({
			message: "A token is required",
        });
        return
    }
    
	const data = await sql.get("user", ["*"], {
		where: {
			token,
		},
	});

	if (!!data.length) {
		res.status(200).json({
			message: "用户不存在",
		});
	}

	res.status(200).json({
		user: data,
		message: "登录成功",
	});
};
