import sql from "../../../utils/db";
import verifyJWT from "../../../utils/verifyJWT";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    /**
     * 新的投票ID
     */
    id?: unknown;
    /**
     * 新创建的投票标题
     */
    title?: string;
    message: string;
};

/**
 * 创建投票
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { title, deadline, description } = req.body;

        const { TOKEN: token } = req.cookies;

        const verification = verifyJWT(token);

        if (!!!verification) {
            return res.status(200).json({
                message: "TOKEN无效",
            });
        }

        const identify = await sql.get("user", ["isAdmin"], {
            where: {
                key: "id",
                value: `"${verification.id}"`,
            },
        });

        if (!!!identify.length || !!!identify[0].isAdmin) {
            return res.status(204).json({
                message: "需要管理员权限",
            });
        }

        const add = await sql.insert("music_votes", {
            title,
            deadline,
            description,
        });

        return res.status(201).json({
            message: "创建成功",
            id: add.insertId,
            title,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};
