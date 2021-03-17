import sql from "../../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
}

/**
 * 删除一个投票中的某个歌曲
 * @param {string} musicId 音乐ID
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { musicId, id } = req.query;

        const originData = await sql.get('music', ['musics'], {
            where: {
                id: id
            },
            order: "AESC"
        })

        const targetData = JSON.parse(originData)

        for (let i in targetData) {
            if (targetData[i].id === musicId) {
                targetData[i].statu = 0
            }
        }

        const update = await sql.update('music', {
            musics: JSON.stringify(targetData)
        })

        res.status(200).json({
            message: "删除成功"
        });
    } catch (err) {
        res.status(201).json({
            message: "删除失败"
        });
    }

};
