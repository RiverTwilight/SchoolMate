import React, { useState, useEffect, createRef, useRef } from "react";
import Layout from "../../components/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PlayArrowTwoToneIcon from "@material-ui/icons/PlayArrowTwoTone";
import PauseCircleFilledTwoToneIcon from "@material-ui/icons/PauseCircleFilledTwoTone";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";

const useStyles = makeStyles({
	audio: {
		display: "none",
	},
});

export async function getServerSideProps(context) {
	const { id } = context.query;
	const config = await import(`../../data/config.json`);

	return {
		props: {
			siteConfig: config.default,
			id,
		},
	};
}

/**
 * 投票详情
 */

const Music = ({ id, siteConfig, locale, title }) => {
	const audioDom = useRef<HTMLAudioElement>(null);
	const classes = useStyles();
	const [songlist, setSonglist] = useState([]);
	const [currentAudio, setCurrentAudio] = useState(0);
	const [onPlay, setOnPlay] = useState(false);
	useEffect(() => {
		const res = fetch(`/api/getMusicDetail`)
			.then((res) => res.json())
			.then((data) => {
				setSonglist(data.musics);
			});
	}, []);

	const handleClick = (songId) => {
		// TODO 音乐试听

		
		if (songId !== currentAudio) {
			setCurrentAudio(songId);
			audioDom.current.load();
		}
		
		if (onPlay) {
			audioDom.current.pause();
		} else {
			audioDom.current.play();
		}
		setOnPlay(!onPlay);
		console.log(onPlay, currentAudio);
	};
	const handleAudioEnded = () => {
		setOnPlay(false);
	};
	return (
		<Layout
			currentPage={{
				text: title || "起床铃投票",
				path: "/music/" + id,
			}}
			locale={locale}
			config={siteConfig}
		>
			<List component={Paper} aria-label="music list">
				{songlist.map((song, i) => (
					<ListItem key={song.name} button>
						<ListItemText primary={song.name} />
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => handleClick(i)}
							>
								{onPlay && currentAudio === i ? (
									<PauseCircleFilledTwoToneIcon />
								) : (
									<PlayArrowTwoToneIcon />
								)}
							</IconButton>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => handleClick(i)}
							>
								<ThumbUpAltTwoToneIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
			{songlist.length && (
				<audio
					onEnded={handleAudioEnded}
					className={classes.audio}
					controls={true}
					ref={audioDom}
				>
					<source
						src={songlist[currentAudio].playUrl}
						type="audio/mpeg"
					/>
					Your browser does not support the audio tag.
				</audio>
			)}
		</Layout>
	);
};

export default Music;
