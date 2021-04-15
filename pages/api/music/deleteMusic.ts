import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
    currentMusics?: any;
    deletedMusic?: any;
};

/**
 * 给一首歌曲投票
 * @param {string} musicId 音乐ID
 * @param {string} id 投票session ID
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { musicId, id } = req.query;

        const { TOKEN: token } = req.cookies;

        const identify = await sql.get("music_votes", ["musics"], {
            where: {
                key: "id",
                value: `"${id}"`,
            },
        });

        const originMusics = JSON.parse(identify[0].musics);

        var deletedMusic;

        for (var i in originMusics) {
            if (i == musicId) {
                originMusics[i].statu = 1;
                deletedMusic = originMusics[i];
                break;
            }
        }

        await sql.update(
            "music_votes",
            {
                musics: JSON.stringify(originMusics),
            },
            {
                key: "id",
                value: `'${id}'`,
            }
        );

        return res.status(200).json({
            message: "删除成功",
            currentMusics: originMusics,
            deletedMusic,
        });
    } catch (err) {
        res.status(201).json({
            message: "投票失败：服务器错误",
        });
    }
};
