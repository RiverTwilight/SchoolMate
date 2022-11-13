import db from '@/utils/prisma'
import verifyJWT from '@/utils/middlewares/verifyJWT'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
    currentVote?: number
    currentVoter?: string
}

export type VoteMusicReqBody = {
    musicId: string
    vote: number
}

export const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    userData
) => {
    try {
        const { musicId, vote } = req.query as VoteMusicReqBody

        await db.music.update({
            data: {
                vote: {
                    increment: 1,
                },
            },
            where: {
                id: musicId,
            },
        })

        return res.status(201).json({
            message: '投票成功',
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: '投票失败：服务器错误',
        })
    }
}

export default verifyJWT(handler)
