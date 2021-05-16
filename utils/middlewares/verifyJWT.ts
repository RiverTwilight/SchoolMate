import sql from "../db";
import type { NextApiRequest, NextApiResponse } from "next";
import verifyJWT from "../verifyJWT";

export default (handler: (req, res, userData) => void) => {
	return (req: NextApiRequest, res: NextApiResponse) => {
		const { TOKEN: token } = req.cookies;

		const userData = verifyJWT(token);

		if (!!!userData) {
			return res.status(200).json({
				message: "未登录",
			});
		}

		handler && handler(req, res, userData);
	};
};
