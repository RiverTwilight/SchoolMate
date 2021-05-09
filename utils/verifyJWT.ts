import jwt from "jsonwebtoken";

export default (token: string): unknown => {
	// console.log(token);
	return !!token ? jwt.verify(token, process.env.JWT_SECRET) : false;
};
