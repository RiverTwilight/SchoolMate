import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import verifyJWT from "../../../utils/verifyJWT";

type Data = {
    message: string;
    currentVote?: number;
    currentVoter?: string[];
};

/**
 * // TODO 给一首歌曲投票
 * @param {string} musicId 音乐ID
 * @param {number} vote 投票数量 +1 or 0
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { musicId, vote } = req.query;

        const { TOKEN: token } = req.cookies;

        const userData = verifyJWT(token);

        console.log(userData);

        const condition = {
            key: `(id)`,
            value: `('${musicId}')`,
        };

        if (!!!userData) {
            return res.status(200).json({
                message: "未登录",
            });
        }

        const defaultData = await sql.get("musics", ["vote", "voter"], {
            where: condition,
        });

        const defaultVoter = JSON.parse(defaultData[0].voter);

        if (defaultVoter.includes(userData.id)) {
            return res.status(200).json({
                message: "重复投票",
            });
        }

        const currentVote = parseInt(defaultData[0].vote + vote);
        const currentVoter = [...defaultVoter, userData.id];

        await sql.update(
            "musics",
            {
                vote: currentVote,
                voter: JSON.stringify(currentVoter),
            },
            condition
        );

        return res.status(201).json({
            message: "投票成功",
            currentVote,
            currentVoter,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "投票失败：服务器错误",
        });
    }
};
