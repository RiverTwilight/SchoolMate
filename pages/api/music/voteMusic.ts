import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import verifyJWT from "../../../utils/verifyJWT";

type Data = {
	message: string;
	currentMusics?: any;
};

/**
 * 给一首歌曲投票
 * @param {string} musicId 音乐ID
 * @param {string} id 投票session ID
 * @param {number} vote 投票数量 +1 or 0
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { musicId, id, vote } = req.query;

		const { TOKEN: token } = req.cookies;

		const verification = verifyJWT(token);

		const identify = await sql.get("music_votes", ["musics"], {
			where: {
				key: "id",
				value: `"${id}"`,
			},
		});

		const originMusics = JSON.parse(identify[0].musics);

		var currentVote = 0;

		console.log("before", originMusics)

		for (var i in originMusics) {
			if (i === musicId) {
				if (parseInt(vote) > 0) {
					currentVote = originMusics[i].vote + 1;
					originMusics[i].vote = currentVote;
					originMusics[i].voterId.push(verification.id);
				} else {
					currentVote = originMusics[i].vote - 1;
					originMusics[i].vote = currentVote;
					originMusics[i].voterId.splice(
						originMusics[i].voterId.indexOf(verification.id),
						1
					);
				}
				break;
			}
		}

		console.log("after",originMusics)

		await sql.update(
			"music_votes",
			{
				musics: JSON.stringify(originMusics),
			},
			{
				key: "id",
				value: `'${id}'`,
			}
		);

		return res.status(200).json({
			message: "投票成功",
			currentMusics: originMusics,
		});
	} catch (err) {
		console.log(err);
		res.status(201).json({
			message: "投票失败：服务器错误",
		});
	}
};
