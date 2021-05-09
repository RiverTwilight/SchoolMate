import type { NextApiRequest, NextApiResponse } from "next";
import sql from "../../../utils/db";

type Data = {
	musicData?: IMusic[];
	message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { vote_id } = req.query;
		const musicData = await sql.get("musics", ["*"], {
			where: { key: "vote_id", value: `'${vote_id}'` },
		});
		res.status(200).json({
			musicData: musicData,
			message: "Get successfully",
		});
	} catch (err) {}
};
