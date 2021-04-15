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

        const { TOKEN: token } = req.cookies;

        const identify = await sql.get("user", ["isAdmin"], {
            where: {
                key: "token",
                value: `"${token}"`
            }
        })

        if (!!!identify.length) {
            return res.status(400).json({
                message: "需要管理员权限"
            });
        }

        const add = await sql.insert("music_votes", {
            title,
            deadline,
            musics,
            description,
            votedUser: "[]"
        });

        return res.status(200).json({
            message: "创建成功",
            id: add.insertId,
        });

    } catch (err) {
        res.status(400).json({
            message: err,
        });
    }
};
