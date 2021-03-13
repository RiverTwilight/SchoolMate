const MOCK_DATA = [
	{
		title: "第一周投票",
		tickets: 4,
		subscription: "快来为起床铃投票",
		id: 1,
	},
];

export default (req, res) => {
	res.status(200).json({ list: MOCK_DATA });
};
