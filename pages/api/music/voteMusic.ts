import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    currentMusics?: any
}

/**
 * 给一首歌曲投票
 * @param {string} musicId 音乐ID
 * @param {string} id 投票session ID
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { musicId, id, userId } = req.query;

        const { TOKEN: token } = req.cookies;

        const identify = await sql.get("music_votes", ["musics, votedUser"], {
            where: {
                key: "id",
                value: `"${SqlString.escape(id)}"`,
            },
        });

        const votedUser = JSON.parse(identify[0].votedUser);

        // if (votedUser.includes(parseInt(userId))) {
        //     return res.status(201).json({
        //         message: "重复投票",
        //     });
        // }

        const originMusics = JSON.parse(identify[0].musics);

        var currentVote = 0;

        for (var i in originMusics) {
            if (i == musicId) {
                currentVote = originMusics[i].vote + 1;
                originMusics[i].vote = currentVote;
                break;
            }
        }

        await sql.update('music_votes', {
            musics: JSON.stringify(originMusics),
            votedUser: JSON.stringify([...votedUser, parseInt(userId)])
        }, {
            key: "id",
            value: `'${id}'`
        })

        return res.status(200).json({
            message: "投票成功",
            currentMusics: originMusics
        });
    } catch (err) {
        res.status(201).json({
            message: "投票失败：服务器错误",
        });
    }

};
