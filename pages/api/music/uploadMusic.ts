import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import url2id from "../../../utils/url2id";

type Data = {
    /**
     * 新的投票ID
     */
    id?: unknown;
    message?: string;
    newMusic?: any;
};

/**
 * 创建投票
 */

// FIXME 投稿出错
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        // TODO 防SQL注入
        const { musicUrl, id, reason, title, artist } = req.body;

        const { TOKEN: token } = req.cookies;

        // parse url, see https://blog.csdn.net/weixin_33725239/article/details/93425087
        const identify = await sql.get("music_votes", ["musics"], {
            where: {
                key: "id",
                value: `"${id}"`,
            },
        });

        const originMusics = JSON.parse(identify[0].musics);

        console.log(originMusics)

        if (originMusics.map((item) => item.voterToken).includes(token)) {
            return res.status(204).json({
                message: "重复投稿",
                id,
            });
        }

        const musicId = url2id(musicUrl);

        var playUrl = musicId
            ? `http://music.163.com/song/media/outer/url?id=${musicId}.mp3`
            : musicUrl;

        console.log(playUrl);

        const newMusic = {
            musicUrl,
            playUrl,
            reason,
            artist,
            title,
            vote: 0,
            voterToken: token,
            statu: 0,
        };

        originMusics.push(newMusic);

        const add = await sql.update(
            "music_votes",
            {
                musics: JSON.stringify(originMusics),
            },
            {
                key: "id",
                value: id,
            }
        );

        console.log(add);

        res.status(200).json({
            message: "投稿成功",
            newMusic,
            id,
        });
    } catch (err) {
        res.status(301).json({
            message: err,
        });
    }
};
