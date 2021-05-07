import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import url2id from "../../../utils/url2id";
import verifyJWT from "../../../utils/verifyJWT";

type Data = {
    /**
     * 新的投票ID
     */
    id?: unknown;
    message?: string;
    newMusic?: INewMusic;
};

interface INewMusic {

}

/**
 * 创建投票
 */

const fetcher = (url) => fetch(url).then((res) => res.json());

const process163 = async (id: string | number) => {
    const lyrics = await fetcher(
        "https://music.163.com/api/song/lyric?id=65800&lv=1&kv=1&tv=-1"
    );
    console.log(lyrics);
    return {
        lyrics,
        playUrl: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
    };
};

const processCustom = async () => {};

// FIXME 投稿出错
// TODO 网易云音乐解析
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        // TODO 防SQL注入
        const { musicUrl, id, reason, title, artist } = req.body;

        const { TOKEN: token } = req.cookies;

        const userData = verifyJWT(token);

        // parse url, see https://blog.csdn.net/weixin_33725239/article/details/93425087
        const identify = await sql.get("music_votes", ["musics"], {
            where: {
                key: "id",
                value: `"${id}"`,
            },
        });

        const originMusics = JSON.parse(identify[0].musics);

        if (originMusics.map((item) => item.uploaderId).includes(userData.id)) {
            return res.status(204).json({
                message: "重复投稿",
                id,
            });
        }

        var musicType: "163" | "qq" | "kugou" | "custom" =  "163";

        const { lyrics, playUrl } = await {
            "163": process163,
            custom: processCustom,
        }[musicType](musicUrl);

        const newMusic: INewMusic = {
            musicUrl,
            playUrl,
            reason,
            artist,
            lyrics,
            title,
            vote: 0,
            uploaderId: token,
            voterId: [],
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

        return res.status(200).json({
            message: "投稿成功",
            newMusic,
            id,
        });
    } catch (err) {
        return res.status(301).json({
            message: err,
        });
    }
};
