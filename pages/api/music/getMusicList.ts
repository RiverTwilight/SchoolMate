import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
// var Mock = require('mockjs');
// const env = "sad" || process.env.NODE_ENV

// console.log(env)

type Data = {
    message: string;
    data?: any;
};

/**
 * 获取投票列表
 * @param {string} id 投票ID
 */

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { page, order } = req.query;

        const result = await sql.get("music_votes", ["*"], {
            order:
                {
                    createDate: "createDate",
                }[order] || "createDate",
            // sort: "DESC",
            // limit: page * 8
        });

        return res.status(200).json({
            message: "获取成功",
            data: result,
        });
    } catch (err) {
        return res.status(201).json({
            message: "操作失败",
        });
    }
};
