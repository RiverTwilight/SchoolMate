import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/prisma'

export type GetVoteMusicReqBody = {
    musicData?: IMusic[]
    message: string
}

interface GetVoteMusicRes {
    data?: IMusic[]
    message: string
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<GetVoteMusicRes>
) => {
    try {
        const { vote_id = 1 } = req.query as GetVoteMusicReqBody

        const musicData = await db.musicVoteSession.findUnique({
            where: {
                id: vote_id,
            },
            include: {
                musics: true,
            },
        })

        console.log(musicData)

        return res.status(200).json({
            data: musicData.musics,
            message: 'Get successfully',
        })
    } catch (err) {
        res.status(500).json({
            message: '服务器错误',
        })
    }
}
