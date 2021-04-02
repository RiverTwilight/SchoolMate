import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import url2id from "../../../utils/url2id"

type Data = {
	/**
	 * 新的投票ID
	 */
    id?: unknown;
    message?: string;
    newMusic?: any
};

/**
 * 创建投票
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { musicUrl, id, reason, title, artist } = JSON.parse(req.body);

        const { TOKEN: token } = req.cookies;

        // TODO parse url, see https://blog.csdn.net/weixin_33725239/article/details/93425087
        const identify = await sql.get("music_votes", ["musics"], {
            where: {
                key: "id",
                value: `"${id}"`
            }
        });

        const originMusics = JSON.parse(identify[0].musics);

        
        for (let i of originMusics) {
            if (i.voterToken === token) {
                res.status(204).json({
                    message: "重复投稿",
                    id
                });
                break;
            }
        }
        
        const musicId = url2id(musicUrl);

        if (!musicId) {
            res.status(205).json({
                message: "链接不合法",
                id
            });
        }

        const playUrl = `http://music.163.com/song/media/outer/url?id=${musicId}.mp3`;

        const newMusic = {
            musicUrl,
            playUrl,
            reason,
            artist,
            title,
            vote: 0,
            voterToken: token
        }

        originMusics.push(newMusic)

        const add = await sql.update("music_votes", {
            musics: JSON.stringify(originMusics)
        }, {
            key: "id",
            value: id
        });

        console.log(add)

        res.status(200).json({
            message: "投稿成功",
            newMusic,
            id
        });

    } catch (err) {
        res.status(301).json({
            message: err,
        });
    }
};
