import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/prisma'
import url2id from '@/utils/url2id/163'
import verifyJWT from '@/utils/middlewares/verifyJWT'

type Data = {
    /**
     * 新的投票ID
     */
    id?: unknown
    message?: string
    newMusic?: INewMusic
}

export type UploadMusicReqBody = {
    musicUrl: string
    reason: string
    title: string
    artist: string
    lyrics: string
    id: string
}

interface INewMusic {}

const MAX_UPLOAD_NUM_PER_USER = 30

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    userData
) => {
    try {
        const { musicUrl, id, reason, title, artist, lyrics } =
            req.body as UploadMusicReqBody

        // parse url, see https://blog.csdn.net/weixin_33725239/article/details/93425087
        const identify = await db.user.findUnique({
            where: {
                id: userData.id,
            },
            include: {
                createdMusic: true,
            },
        })

        if (identify.createdMusic.length >= MAX_UPLOAD_NUM_PER_USER) {
            return res.status(200).json({
                message: '重复投稿',
                id,
            })
        }

        console.log('First time ')

        const newMusic = {
            playUrl: `https://music.163.com/song/media/outer/url?id=${url2id(
                musicUrl
            )}.mp3`,
            reason,
            artist,
            title,
            lyrics,
            status: 0,
            vote: 0,
            sessionId: id,
            submitterId: userData.id,
        }

        const createMusic = await db.user.update({
            data: {
                musics: {
                    create: [newMusic],
                },
            },
            where: {
                id: userData.id,
            },
        })

        console.log('newMusic', createMusic)

        return res.status(201).json({
            message: '投稿成功',
            newMusic,
            id,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err,
        })
    }
}

export default verifyJWT(handler)
