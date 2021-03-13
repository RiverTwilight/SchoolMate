import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PlayArrowTwoToneIcon from "@material-ui/icons/PlayArrowTwoTone";
import PauseCircleFilledTwoToneIcon from "@material-ui/icons/PauseCircleFilledTwoTone";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";

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
	const [detail, setDetail] = useState({
		title: "未命名",
		musics: [],
	});
	const [currentAudio, setCurrentAudio] = useState(0);
	const [onPlay, setOnPlay] = useState(false);
	useEffect(() => {
		const res = fetch(`/api/getMusicDetail`)
			.then((res) => res.json())
			.then((data) => {
				setDetail(data);
			});
	}, []);

	const handlePlay = (songId) => {
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
	const handleVote = (songId) => {
		// TODO vote
	};
	return (
		<Layout
			currentPage={{
				text: title || `${detail.title} - 起床铃投票`,
				path: "/music/" + id,
			}}
			locale={locale}
			config={siteConfig}
		>
			<Typography variant="body1">{detail.description}</Typography>
			<Chip
				color="primary"
				icon={<AlarmOnIcon />}
				label="进行中 - 还有3天结束"
			/>
			<Chip icon={<AlarmOnIcon />} label="投票已结束" />
			<br />
			<br />
			<List component={Paper} aria-label="music list">
				{detail.musics.map((song, i) => (
					<ListItem key={song.name} button>
						<ListItemText primary={song.name} />
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => handlePlay(i)}
							>
								{onPlay && currentAudio === i ? (
									<PauseCircleFilledTwoToneIcon />
								) : (
									<PlayArrowTwoToneIcon />
								)}
							</IconButton>
							<Button
								aria-label="delete"
								startIcon={<ThumbUpAltTwoToneIcon />}
							>
								3
							</Button>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
			{detail.musics.length && (
				<audio
					onEnded={handleAudioEnded}
					className={classes.audio}
					controls={true}
					ref={audioDom}
				>
					<source
						src={detail.musics[currentAudio].playUrl}
						type="audio/mpeg"
					/>
					Your browser does not support the audio tag.
				</audio>
			)}
		</Layout>
	);
};

export default Music;
