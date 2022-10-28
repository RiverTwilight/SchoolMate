import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default (handler: (req, res, userData) => void) => {
    return (req: NextApiRequest, res: NextApiResponse) => {
        const { TOKEN: token } = req.cookies

        if (!!!token) {
            return res.status(200).json({
                errCode: 10001,
                message: '未登录',
            })
        }

        const { exp } = jwt.decode(token)

        if (Date.now() >= exp * 1000) {
            return res.status(200).json({
                message: '登录已过期',
            })
        }

        const userData = jwt.verify(token, process.env.JWT_SECRET)

        handler && handler(req, res, userData)
    }
}
