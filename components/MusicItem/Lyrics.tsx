import { useEffect, useState } from "react";
import Axios from "axios";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default ({
	onClose,
	open,
	lyricsUrl,
	title,
}: {
	lyricsUrl: string;
	open: boolean;
	title: string;
	onClose: () => void;
}) => {
	const [lyrics, setLyrics] = useState("");
	console.log(lyricsUrl);
	useEffect(() => {
		open &&
			lyrics === "" &&
			lyricsUrl !== "" &&
			Axios.get(lyricsUrl, {
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			}).then((res) => {
				console.log(res);
				// setLyrics(res)
			});
	}, []);
	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle id="simple-dialog-title">歌词 - {title}</DialogTitle>
			{lyrics}
		</Dialog>
	);
};
