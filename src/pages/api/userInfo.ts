import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/prisma'
import verifyJWT from '@/utils/middlewares/verifyJWT'

type Data = {
    message: string
    data?: unknown
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    userData
) => {
    try {
        switch (req.method) {
            case 'GET':
                const data = await db.user.findUnique({
                    where: {
                        id: userData.id,
                    },
                    select: {
                        id: true,
                        name: true,
                        class: true,
                        status: true,
                        role: true,
                    },
                })

                return res.status(200).json({
                    message: 'Get successfully',
                    data: data,
                })
            case 'PUT':
                const { name, class: class_, status } = req.body
                return res.status(200).json({
                    message: 'Get successfully',
                })
            case 'DELETE':
                return res.status(200).json({
                    message: 'Get successfully',
                })
            case 'UPDATE':
                return res.status(200).json({
                    message: 'Get successfully',
                })
            default:
                return res.status(200).json({
                    message: 'Get successfully',
                })
        }
    } catch (err) {
        return res.status(500).json({
            message: err,
        })
    }
}

export default verifyJWT(handler)
