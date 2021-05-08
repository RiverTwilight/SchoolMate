import jwt from "jsonwebtoken";
import type { NextApiResponse } from "next";

export default (token: string, res?: NextApiResponse): unknown => {
	console.log(token);

	return !!token ? jwt.verify(token, process.env.JWT_SECRET) : false;
};
