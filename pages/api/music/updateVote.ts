import sql from "../../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
}

/**
 * 更新投票信息
 * @param {string} id 投票ID
 * @param {string} userID 用户ID
 * @param {string} token 用户TOKEN
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { id, newData, userID, token } = req.query;

        // TODO 验证是否为管理员

        const update = await sql.update('music', newData, {
            where: {
                id,
            }
        })

        res.status(200).json({
            message: "更新成功"
        });
    } catch (err) {
        res.status(201).json({
            message: "操作失败"
        });
    }

};
