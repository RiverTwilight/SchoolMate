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
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";

const useStyles = makeStyles({
	audio: {
		display: "none",
	},
});

export async function getServerSideProps(context: { query: { id: any } }) {
	const { id } = context.query;
	const config = await import(`../../data/config.json`);

	return {
		props: {
			siteConfig: config.default,
			id,
		},
	};
}

const MusicItem = ({
	name,
	index,
	id,
	currentIndex,
	playUrl,
	vote,
	handlePlayIndexChange,
}: {
	name: string;
	vote: number;
	playUrl: string;
	index: number;
	id: number;
	currentIndex: number;
	handlePlayIndexChange: (index: number) => void;
}) => {
	const audioDom = useRef<HTMLAudioElement>(null);
	const classes = useStyles();
	const [onPlay, setOnPlay] = useState(false);

	useEffect(() => {
		if (currentIndex !== index) {
			audioDom.current.pause();
		}
	}, [currentIndex]);

	const handleClick = () => {
		setOnPlay(!onPlay);

		handlePlayIndexChange(index);

		if (onPlay) {
			audioDom.current.pause();
		} else {
			audioDom.current.play();
		}
	};

	const handleAudioEnded = () => {
		setOnPlay(false);
	};

	const handleAudioPlay = () => {
		setOnPlay(true);
	};

	const handleDelete = () => {
		// TODO 删除歌曲
		fetch(`/api/music/deleteMusic?id=${id}`)
			.then((res) => res.json())
			.then((data) => {
				switch (data.code) {
				}
			});
	};

	return (
		<>
			<ListItem button>
				<ListItemText primary={name} />
				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						aria-label="delete"
						onClick={handleClick}
					>
						{onPlay && currentIndex === index ? (
							<PauseCircleFilledTwoToneIcon />
						) : (
							<PlayArrowTwoToneIcon />
						)}
					</IconButton>
					<Button
						aria-label="vote"
						onClick={handleClick}
						startIcon={<ThumbUpAltTwoToneIcon />}
					>
						{vote}
					</Button>
					{isAdmin && (
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={handleDelete}
						>
							<CloseOutlinedIcon />
						</IconButton>
					)}
				</ListItemSecondaryAction>
			</ListItem>
			<audio
				onEnded={handleAudioEnded}
				onPlay={handleAudioPlay}
				className={classes.audio}
				controls={true}
				ref={audioDom}
			>
				<source src={playUrl} type="audio/mpeg" />
				Your browser does not support the audio tag.
			</audio>
		</>
	);
};

/**
 * 投票详情
 */

const Page = ({ id, siteConfig, locale, title }) => {
	return (
		<Layout
			currentPage={{
				text: title || `起床铃投票`,
				path: "/music/" + id,
			}}
			locale={locale}
			config={siteConfig}
		>
			<Music id={id} />
		</Layout>
	);
};

//@ts-expect-error
const Music = ({ userData, id }: { id: number }) => {
	const audioDom = useRef<HTMLAudioElement>(null);
	const classes = useStyles();
	const [detail, setDetail] = useState({
		title: "未命名",
		musics: "{}",
	});
	const [currentAudio, setCurrentAudio] = useState(0);
	const [onPlay, setOnPlay] = useState(false);

	useEffect(() => {
		const res = fetch(`/api/music/getMusicDetail?id=${id}`)
			.then((res) => res.json())
			.then((data) => {
				setDetail(data.musicData);
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
	const musics = JSON.parse(detail.musics).list;
	return (
		<>
			<Typography variant="h5">{detail.title}</Typography>
			{detail.statu == 0 ? (
				<Chip
					color="primary"
					icon={<AlarmOnIcon />}
					label="进行中 - 还有3天结束"
				/>
			) : (
				<Chip icon={<AlarmOnIcon />} label="投票已结束" />
			)}
			<br />
			<br />
			{!!musics && (
				<List component={Paper} aria-label="music list">
					{musics.map((song, i) => (
						<MusicItem
							index={i}
							id={id}
							vote={song.vote}
							currentIndex={currentAudio}
							handlePlayIndexChange={setCurrentAudio}
							playUrl={song.playUrl}
							name={song.name}
							key={song.name}
						/>
					))}
				</List>
			)}
		</>
	);
};

export default Page;
