import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import verifyJWT from "../../../utils/verifyJWT";

type Data = {
    message: string;
};

/**
 * 给一首歌曲投票
 * @param {string} musicId 音乐ID
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { musicId } = req.query;

        const { TOKEN: token } = req.cookies;

        const userData = verifyJWT(token);

        if (!!!userData) {
            return res.status(200).json({
                message: "TOKEN无效",
            });
        }

        const task = await sql.update(
            "musics",
            {
                statu: 1,
            },
            {
                key: "id",
                value: musicId,
            }
        );

        return res.status(200).json({
            message: "删除成功",
        });
    } catch (err) {
        res.status(201).json({
            message: "投票失败：服务器错误",
        });
    }
};
