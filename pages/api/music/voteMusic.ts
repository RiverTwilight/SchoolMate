import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import verifyJWT from "../../../utils/verifyJWT";

type Data = {
    message: string;
    currentVote?: number;
    currentVoter?: string;
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
            }),
            defaultVoter = JSON.parse(defaultData[0].voter);

        const defaultVote = parseInt(defaultData[0].vote);

        var currentVoter, currentVote;

        if (defaultVote + Number(vote) >= 0) {
            if (Number(vote) > 0) {
                currentVoter = [...defaultVoter, userData.id];
            } else {
                currentVoter = defaultVoter.filter(
                    (voter) => voter !== userData.id
                );
                console.log("down", currentVoter);
            }
            currentVote = defaultVote + Number(vote);
        } else {
            currentVote = defaultVote;
        }

        console.log(currentVote, currentVoter);

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
            currentVoter: JSON.stringify(currentVoter),
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "投票失败：服务器错误",
        });
    }
};
