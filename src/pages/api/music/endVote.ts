import sql from "../../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
}

/**
 * 结束某个投票
 * @param {string} id 投票ID
 * @param {string} userID 用户ID
 * @param {string} token 用户TOKEN
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { id, userID, token } = req.query;

        const update = await sql.update('music', {
            statu: 1
        }, {
            where: {
                id,
            }
        })

        res.status(200).json({
            message: "投票已结束"
        });
    } catch (err) {
        res.status(201).json({
            message: "操作失败"
        });
    }

};
