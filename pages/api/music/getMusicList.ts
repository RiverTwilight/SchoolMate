import sql from "../../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    data?: any
}

/**
 * 获取投票列表
 * @param {string} id 投票ID
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { id } = req.query;

        const result = await sql.get('music', ["*"], {
            where: {
                id,
            }
        })

        res.status(200).json({
            message: "获取成功",
            data: result
        });
    } catch (err) {
        res.status(201).json({
            message: "操作失败"
        });
    }

};
