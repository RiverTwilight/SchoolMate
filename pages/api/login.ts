import sha256 from "crypto-js/sha256";
import sql from "../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
	token?: string;
};

/**
 * 登录
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { name, tel, token, password, grade, classNum } = req.body;

	var originToken = generateToken(name, tel);

	const condition = {
		key: "name, tel, class, grade",
		value: `'${name}', '${tel}', '${classNum}', '${grade}'`,
	};

	const data = await sql.get("user", ["*"], {
		where: condition,
		limit: 1,
	});

	if (!!!data.length) {
		res.status(202).json({
			message: "用户不存在",
		});
		return;
	}

	if (data[0].password === password) {
		if (data[0].token == "") {
			console.log("初始化登录");
			await sql.update(
				"user",
				{
					token: originToken,
				},
				condition
			);
		}

		res.status(200).json({
			message: "登录成功",
			token: data[0].token || generateToken(name, tel),
		});
	} else {
		res.status(202).json({
			message: "密码错误",
		});
	}
};

const generateToken = (name: string, tel: string): string => {
	return sha256(name + tel) + "";
};
