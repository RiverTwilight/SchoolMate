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
        const { musicUrl, id, reason } = JSON.parse(req.body);

        const { TOKEN: token } = req.cookies;

        // TODO 判断重复投票
        const identify = await sql.get("user", ["isAdmin"], {
            where: {
                key: "token",
                value: `"${token}"`
            }
        })

        const add = await sql.insert("music_votes", {
            title,
            deadline,
            musics,
            description,
        });

        console.log(add)

        res.status(200).json({
            message: "投稿成功",
            id: add.insertId,
        });

    } catch (err) {
        res.status(301).json({
            message: err,
        });
    }
};
