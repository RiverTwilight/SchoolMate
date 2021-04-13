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
	const { name, tel, password, grade, classNum } = req.body;

	var originToken = generateToken(name, classNum, grade);

	const condition = {
		key: "name, class, grade",
		value: `'${name}', '${classNum}', '${grade}'`,
	};

	const data = await sql.get("user", ["*"], {
		where: condition
	});

	if (!!!data.length) {
		return res.status(202).json({
			message: "用户不存在",
		});
    }else if(data.length >= 2){
        data = data.filter(user => user.tel === tel)
	}

	if (data[0].password === password) {
        console.log(data)
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

		return res.status(200).json({
			message: "登录成功",
			token: data[0].token || originToken,
		});
	} else {
		res.status(202).json({
			message: "密码错误",
		});
	}
};

const generateToken = (name: string, classNum: string, grade: number): string => {
	return sha256(name + grade + classNum) + "";
};
