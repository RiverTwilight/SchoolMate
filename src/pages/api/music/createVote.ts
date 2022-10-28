import db from '@/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWT from '@/utils/middlewares/verifyJWT'
import { ResponseData } from 'src/types'

interface ICreateVoteRes extends ResponseData {
    id?: unknown
    title?: string
    message: string
}

export type CreateVoteReqBody = {
    title: string
    deadline: string
    description: string
}

/**
 * 创建投票
 */

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ICreateVoteRes>,
    userData
) => {
    try {
        const { title, deadline, description } = req.body as CreateVoteReqBody

        const identify = await db.user.findUniqueOrThrow({
            where: {
                id: userData.id,
            },
        })

        if (!!!identify.status !== 3) {
            return res.status(204).json({
                errCode: 10004,
                message: '需要管理员权限',
            })
        }

        await db.musicVoteSession.create({
            title,
            deadline,
            description,
        })

        return res.status(201).json({
            message: '创建成功',
            id: add.insertId,
            title,
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
            errCode: 10020,
        })
    }
}

export default verifyJWT(handler)
