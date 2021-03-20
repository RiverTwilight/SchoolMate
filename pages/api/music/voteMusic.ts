import sql from "../../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    currentVote?: number
}

/**
 * 给一首歌曲投票
 * @param {string} musicId 音乐ID
 * @param {string} id 投票session ID
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { musicId, id } = req.query;

        const originData: string = await sql.get('music', ['musics'], {
            where: {
                id: id
            },
            order: "AESC"
        })

        const targetData: IMusics[] = JSON.parse(originData[0]);

        var currentVote = 0;

        const update = await sql.update('music', {
            musics: JSON.stringify(targetData, (key, value) => {
                if (value.id === musicId) {
                    currentVote = value.vote + 1
                    return currentVote
                }
            })
        }, {
            where: {
                id,
            }
        })

        res.status(200).json({
            message: "投票成功",
            currentVote
        });
    } catch (err) {
        res.status(201).json({
            message: "投票失败"
        });
    }

};
