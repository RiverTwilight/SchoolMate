import sha256 from "crypto-js/sha256";
import sql from "../../utils/db";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
	token?: string;
	grade?: number;
	classNum?: number;
	name?: string;
};

/**
 * 登录
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { name, tel, password, grade, classNum } = req.body;

	const condition = {
		key: "name, class, grade",
		value: `'${name}', '${classNum}', '${grade}'`,
	};

	var data = await sql.get("user", ["*"], {
		where: condition,
	});

	if (!!!data.length) {
		return res.status(202).json({
			message: "用户不存在",
		});
	} else if (data.length >= 2) {
		data = data.filter((user) => user.tel === tel);
	}

	if (data[0].password === password) {
		var token = jwt.sign(
			{
				name,
				grade,
				classNum,
				id: data[0].id,
				exp: Math.floor(Date.now() / 1000) + 5 * 24 * 60 * 60,
			},
			process.env.JWT_SECRET
		);

		// if (data[0].token == "") {
		// 	console.log("初始化登录");
		// 	await sql.update(
		// 		"user",
		// 		{
		// 			token: originToken,
		// 		},
		// 		condition
		// 	);
		// }

		return res.status(200).json({
			message: "登录成功",
			token,
			grade,
			classNum,
			name,
		});
	} else {
		res.status(202).json({
			message: "密码错误",
		});
	}
};
