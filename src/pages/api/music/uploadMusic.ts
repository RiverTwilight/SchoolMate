import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import url2id from "../../../utils/url2id/163";
import verifyJWT from "../../../utils/middlewares/verifyJWT";

type Data = {
    /**
     * 新的投票ID
     */
    id?: unknown;
    message?: string;
    newMusic?: INewMusic;
};

interface INewMusic {}

// 每人可以上传多少歌曲
const MAX_UPLOAD_PER_USER = 30;

/**
 * 创建投票
 */

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        // TODO 防SQL注入
        const { musicUrl, id, reason, title, artist, lyrics } = req.body;

        const { TOKEN: token } = req.cookies;

        const userData = verifyJWT(token);

        // parse url, see https://blog.csdn.net/weixin_33725239/article/details/93425087
        const identify = await sql.get("musics", ["voter"], {
            where: {
                key: `(uploader, vote_id)`,
                value: `('${userData.id}', '${id}')`,
            },
        });

        if (identify.length >= process.env.MAX_UPLOAD_PER_USER) {
            return res.status(200).json({
                message: "重复投稿",
                id,
            });
        }

        const newMusic = {
            playUrl: `https://music.163.com/song/media/outer/url?id=${url2id(
                musicUrl
            )}.mp3`,
            reason,
            artist,
            title,
            lyrics,
            vote: 0,
            vote_id: id,
            voter: "[]",
            uploader: userData.id,
            statu: 0,
        };

        const add = await sql.insert("musics", newMusic);

        console.log(add);

        return res.status(201).json({
            message: "投稿成功",
            newMusic,
            id,
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
};

export default verifyJWT(handler)