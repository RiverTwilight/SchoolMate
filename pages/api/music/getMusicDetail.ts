import sql from "../../../utils/db"

const MOCK_DATA = {
	title: "dfsaf",
	musics: [
		{
			name: "测试歌曲1",
			playUrl: "https://www.ygktool.cn/audio/alarm.mp3",
			id: 2,
		},
		{
			name: "测试歌曲2",
			playUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/March_of_the_Volunteers_instrumental.ogg",
			id: 2,
		},
	],
};

export default (req, res) => {
	res.status(200).json(MOCK_DATA);
};
