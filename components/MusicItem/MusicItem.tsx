import { useRef, useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Lyrics from "./Lyrics";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PlayArrowTwoToneIcon from "@material-ui/icons/PlayArrowTwoTone";
import PauseCircleFilledTwoToneIcon from "@material-ui/icons/PauseCircleFilledTwoTone";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		audio: {
			display: "none",
		}
	})
);

export default ({
	title,
	index,
	currentIndex,
	playUrl,
	vote,
	artist,
	reason,
	isAdmin,
	handlePlayIndexChange,
	handleVote,
	handleDelete,
	isVoted,
	lyrics,
}: {
	title: string;
	vote: number;
	artist: string;
	reason: string;
	playUrl: string;
	isAdmin: boolean;
	isVoted: boolean;
	lyrics: string;
	index: number;
	currentIndex: number;
	handlePlayIndexChange: (index: number) => void;
	handleVote: (musicId: number) => void;
	handleDelete: (musicId: number) => void;
}) => {
	const audioDom = useRef<HTMLAudioElement>(null);
	const classes = useStyles();
	const [onPlay, setOnPlay] = useState(false);
	const [openLyrics, setOpenLyrics] = useState(false);

	// console.log(isVoted);

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

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Lyrics
				lyrics={lyrics}
				title={title}
				open={openLyrics}
				onClose={() => {
					setOpenLyrics(false);
				}}
			/>
			<ListItem button>
				<ListItemText
					secondary={`投稿理由：${reason}`}
					primary={`${title} - ${artist}`}
				/>
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
						onClick={handleVote}
						startIcon={
							<ThumbUpAltTwoToneIcon
								color={isVoted ? "primary" : ""}
							/>
						}
					>
						{vote}
					</Button>
					<IconButton
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleClickMenu}
					>
						<MoreVertOutlinedIcon />
					</IconButton>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleCloseMenu}
					>
						<MenuItem
							onClick={() => {
								setOpenLyrics(true);
							}}
						>
							查看歌词
						</MenuItem>
					</Menu>
					{!!isAdmin && (
						<IconButton onClick={handleDelete}>
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
