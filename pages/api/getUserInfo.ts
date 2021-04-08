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
    const { TOKEN: token } = req.cookies;
	
	if (!!!token) {
		return res.status(205).json({
			message: "A token is required",
        });
    }
    
	const data = await sql.get("user", ["*"], {
		where: {
			key: "token",
			value: `'${token}'`
		},
		limit: 1
	});

	if (!!!data.length) {
		return res.status(200).json({
			message: "用户不存在",
		});
	}

	return res.status(200).json({
		user: data[0],
		message: "登录成功",
	});
};
 