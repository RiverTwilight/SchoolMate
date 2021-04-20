import jwt from "jsonwebtoken";

export default (token: string): {
    [data: string]: any
} => {
    console.log(token)
	return jwt.verify(token, process.env.JWT_SECRET);
};
