import sha256 from "crypto-js/sha256"
import sql from "../../utils/db"
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
    token?: string
}

/**
 * 登录
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { name, tel } = req.query;

    const data = await sql.get("user", ["*"], {
        where: {
            name,
            tel
        }
    })

    if (!!data.length) {
        res.status(200).json({
            message: "用户不存在"
        });
    }

    res.status(200).json({
        message: "登录成功",
        token: generateToken(name, tel),
    });
};

const generateToken = (
    name: string, tel: string
): string => {
    return sha256(name + tel)
}