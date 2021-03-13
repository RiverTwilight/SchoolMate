import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
	grade: number;
	class: number;
};

const MOCK_DATA: Data = {
	name: "测试账号",
	grade: 2019,
	class: 8,
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
	res.status(200).json(MOCK_DATA);
};
