import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import verifyJWT from "../../../utils/verifyJWT";

type Data = {
    message: string;
    currentMusics?: any;
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
            return res.status(204).json({
                message: "未登录",
            });
        }

        const defaultData = await sql.get("musics", ["musics"], {
            where: condition,
        });

        var currentVote = defaultData[0].vote;

        // for (var i in originMusics) {
        // 	if (i === musicId) {
        // 		if (parseInt(vote) > 0) {
        // 			currentVote = originMusics[i].vote + 1;
        // 			originMusics[i].vote = currentVote;
        // 			originMusics[i].voterId.push(verification.id);
        // 		} else {
        // 			currentVote = originMusics[i].vote - 1;
        // 			originMusics[i].vote = currentVote;
        // 			originMusics[i].voterId.splice(
        // 				originMusics[i].voterId.indexOf(verification.id),
        // 				1
        // 			);
        // 		}
        // 		break;
        // 	}
        // }

		console.log(defaultData[0])

        await sql.update(
            "musics",
            {
                vote: currentVote + vote,
                voter_id: JSON.stringify([
                    ...JSON.parse(defaultData[0].voter_id),
                    userData.id,
                ]),
            },
            condition
        );

        return res.status(200).json({
            message: "投票成功",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "投票失败：服务器错误",
        });
    }
};
