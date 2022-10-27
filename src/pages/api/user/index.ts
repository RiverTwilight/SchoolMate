import db from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
	token?: string;
	grade?: number;
	classNum?: number;
	name?: string;
};

export type LoginRequestBody = {
	name: string;
	password: string;
	grade: number;
	classNum: number;
	tel: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {};
