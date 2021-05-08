import React, { useState, useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

import MusicItem from "../../components/MusicItem";

import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MusicIcon from "../../public/static/Music.svg";

import Link from "next/link";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		addBtn: {
			right: "20px",
			bottom: "20px",
			position: "fixed",
		},
		container: {
			padding: theme.spacing(2),
			position: "relative",
			minHeight: "100px"
		},
		sessionTitle: {
			lineHeight: "40px",
		},
		action: {
			display: "flex",
			flexDirection: "row-reverse",
			marginTop: theme.spacing(1),
		},
		titleIcon: {
			position: "absolute",
			right: "20px",
			opacity: 0.5,
			bottom: "30px",
			width: "100px",
			height: " 100px",
		},
	})
);

export async function getServerSideProps(context: {
	query: { id: any; title: string };
}) {
	const { id, title } = context.query;
	const config = await import(`../../data/config.json`);

	return {
		props: {
			siteConfig: config.default,
			id,
			title,
			currentPage: {
				title: title || `起床铃投票`,
				path: "/music/" + id,
			},
		},
	};
}

const editModule = () => {
	return <Button></Button>;
};

// TODO 查看歌词功能
const Music = ({ userData = {}, id }: { id: number; userData: IUserData }) => {
	const classes = useStyles();
	const [detail, setDetail] = useState({
		title: "未命名",
		musics: "[]",
		description: "暂无描述",
		isInitial: true,
		statu: 0,
		deadline: "",
		lyrics: ""
	});
	const [currentAudio, setCurrentAudio] = useState(0);

	useEffect(() => {
		fetch(`/api/music/getMusicDetail?id=${id}`)
			.then((res) => res.json())
			.then((data) => {
				setDetail(data.musicData);
			});
	}, []);

	// vote等于0表示取消投票
	const handleVote = (musicId: number, vote) => {
		console.log(musicId);

		Axios.get(
			`/api/music/voteMusic?id=${id}&musicId=${musicId}&vote=${vote}`
		).then((data) => {
			switch (data.status) {
				case 201:
					window.snackbar({
						message: "X " + data.data.message,
					});
					break;
				default:
					var newObj = Object.assign({}, detail, {
						musics: JSON.stringify(data.data.currentMusics),
					});
					setDetail(newObj);
			}
		});
	};

	const musics = detail.musics === "[]" ? [] : JSON.parse(detail.musics);

	// musics.sort((a, b) => {
	// 	return b.vote - a.vote;
	// });

	// TODO 根据日期自动判断是否结束

	const handleDelete = (musicId: number) => {
		Axios.get(`/api/music/deleteMusic?id=${id}&musicId=${musicId}`).then(
			(data) => {
				switch (data.status) {
					case 201:
						window.snackbar({
							message: "",
						});
						break;
					case 200:
						var newObj = Object.assign({}, detail, {
							musics: JSON.stringify(data.data.currentMusics),
						});
						setDetail(newObj);
						break;
				}
			}
		);
	};

	return (
		<>
			<Paper className={classes.container}>
				<Typography className={classes.sessionTitle} variant="h5">
					{detail.title}
				</Typography>
				{!!detail.description && (
					<Typography color="textSecondary" variant="body1">
						{detail.description}
					</Typography>
				)}
				{detail.statu == 0 ? (
					<Chip
						color="primary"
						icon={<AlarmOnIcon />}
						label={`进行中 - 截止日期：${detail.deadline.split("T")[0]
							}`}
					/>
				) : (
					<Chip icon={<AlarmOnIcon />} label="投票已结束" />
				)}
				<div className={classes.action}>
					<Button variant="outlined">分享</Button>
				</div>
				<MusicIcon className={classes.titleIcon} />
			</Paper>
			<br />
			{!!musics.length && (
				<List component={Paper} aria-label="music list">
					{musics.map((song, i) => {
						console.log(song, i);
						if (song.statu !== 1) {
							let isVoted = song.voterId.includes(
								userData.id || 0
							);
							return (
								<MusicItem
									isAdmin={
										userData ? userData.isAdmin : false
									}
									isVoted={isVoted}
									index={i}
									id={id}
									musicId={i}
									vote={song.vote}
									reason={song.reason}
									lyricsUrl={song.lyricsUrl}
									currentIndex={currentAudio}
									handlePlayIndexChange={setCurrentAudio}
									handleVote={() =>
										handleVote(i, isVoted ? 0 : 1)
									}
									handleDelete={() => handleDelete(i)}
									playUrl={song.playUrl}
									title={song.title}
									artist={song.artist}
									key={i + song.title}
								/>
							);
						}
						return null;
					})}
					{!!!musics.filter((music) => music.statu == 0).length && (
						<Typography variant="h6" align="center">
							暂时没有音乐，赶快投稿吧
						</Typography>
					)}
				</List>
			)}

			{musics.isInitial && <Loader />}

			<Link href={`/music/add?id=${id}&title=${detail.title}`}>
				<Fab
					className={classes.addBtn}
					color="primary"
					aria-label="add"
				>
					<AddIcon />
				</Fab>
			</Link>
		</>
	);
};

export default Music;
