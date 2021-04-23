import sql from "../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import verifyJWT from "../../utils/verifyJWT";

type Data = {
    message: string;
    oldToken?: string;
    newToken?: string;
};

/**
 * 修改密码
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { TOKEN: token } = req.cookies;

    if (!!!token) {
        return res.status(203).json({
            message: "TOKEN不存在",
        });
    }

    const verification = verifyJWT(token);

    if (!!!verification) {
        return res.status(203).json({
            message: "TOKEN无效",
        });
    }

    const data = await sql.get("user", ["*"], {
        where: {
            key: "id",
            value: `'${verification.id}'`,
        },
        limit: 1,
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
