import sql from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import url2id from "../../../utils/url2id";
import verifyJWT from "../../../utils/verifyJWT";

type Data = {
	/**
	 * 新的投票ID
	 */
	id?: unknown;
	message?: string;
	newMusic?: INewMusic;
};

interface INewMusic {}

// 每人可以上传多少歌曲
const MAX_UPLOAD_PER_USER = 1;

/**
 * 创建投票
 */

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const process163 = async (id: string | number | boolean) => {
// 	// const lyrics = await fetcher(
// 	//     "https://music.163.com/api/song/lyric?id=65800&lv=1&kv=1&tv=-1"
// 	// );
// 	// console.log(lyrics.lrc.lyric);
// 	return {
// 		lyrics: `https://music.163.com/api/song/lyric?id=${id}&lv=1&kv=1&tv=-1`,
// 		playUrl: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
// 	};
// };

// const processCustom = async () => {};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		// TODO 防SQL注入
		const { musicUrl, id, reason, title, artist, lyrics } = req.body;

		const { TOKEN: token } = req.cookies;

		const userData = verifyJWT(token);

		// parse url, see https://blog.csdn.net/weixin_33725239/article/details/93425087
		const identify = await sql.get("musics", ["voter"], {
			where: {
				key: `(voter, vote_id)`,
				value: `('${userData.id}', '${id}')`,
			},
		});

		if (identify.length >= MAX_UPLOAD_PER_USER) {
			return res.status(200).json({
				message: "重复投稿",
				id,
			});
		}

		// var musicType: "163" | "qq" | "kugou" | "custom" = "163";

		// const { lyrics: lyricsUrl, playUrl } = await {
		// 	"163": process163,
		// 	custom: processCustom,
		// }[musicType](url2id(musicUrl));

		const newMusic = {
			playUrl: `https://music.163.com/song/media/outer/url?id=${url2id(
				musicUrl
			)}.mp3`,
			reason,
			artist,
			title,
			lyrics,
			vote: 0,
			vote_id: id,
			voter: userData.id,
			statu: 0,
		};

		const add = await sql.insert("musics", newMusic);

		console.log(add);

		return res.status(201).json({
			message: "投稿成功",
			newMusic,
			id: add.insertId,
		});
	} catch (err) {
		return res.status(500).json({
			message: err,
		});
	}
};
