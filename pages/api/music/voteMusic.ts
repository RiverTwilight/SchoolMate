import sql from "../../../utils/db"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    currentMusics?: any
}

/**
 * 给一首歌曲投票
 * @param {string} musicId 音乐ID
 * @param {string} id 投票session ID
 */
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { musicId, id } = req.query;

        
		const { TOKEN: token } = req.cookies;

        // TODO 防止重复投票
		const identify = await sql.get("music_votes", ["musics"], {
			where: {
				key: "id",
				value: `"${id}"`,
			},
		});

        const originMusics = JSON.parse(identify[0].musics);
        
        console.log(originMusics)

        var currentVote = 0;

        for(var i in originMusics){
            if(i == musicId){
                console.log(originMusics[i].vote)
                currentVote = originMusics[i].vote + 1;
                originMusics[i].vote = currentVote;
                break;
            }
        }

        const update = await sql.update('music_votes', {
            musics: JSON.stringify(originMusics)
        }, {
            key: "id", 
            value: `'${id}'`
        })

        res.status(200).json({
            message: "投票成功",
            currentMusics: originMusics
        });
    } catch (err) {
        res.status(201).json({
            message: "投票失败"
        });
    }

};
