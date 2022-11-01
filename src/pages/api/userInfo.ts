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
        console.log('Asdfasdf')
        switch (req.method) {
            case 'GET':
                const data = await db.user.findUnique({
                    where: {
                        id: userData.id,
                    },
                })
                console.log(data)
                return res.status(200).json({
                    message: 'Get successfully',
                    data: data,
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
