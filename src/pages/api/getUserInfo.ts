import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/prisma'
import verifyJWT from '@/utils/middlewares/verifyJWT'

type Data = {
    message: string
    user?: unknown
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    userData
) => {
    try {
        const { TOKEN: token } = req.cookies

        const data = await db.user.findUnique({
            where: {
                id: userData.id,
            },
        })

        return res.status(200).json({
            user: data,
            message: '登录成功',
        })
    } catch (err) {}
}

export default verifyJWT(handler)
