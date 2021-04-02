import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

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

        // TODO 判断重复投票
        // TODO parse url, see https://blog.csdn.net/weixin_33725239/article/details/93425087
        const identify = await sql.get("music_votes", ["musics"], {
            where: {
                key: "id",
                value: `"${id}"`
            }
        });

        const originMusics = JSON.parse(identify[0].musics);

        console.log(originMusics);


        for (let i of originMusics.list) {
            console.log(i);
            if(i.title){
                
            }
        }

        const newMusic = {
            musicUrl,
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
