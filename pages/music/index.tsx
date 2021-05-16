import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

import MusicItem from "../../components/MusicItem";

import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import MusicIcon from "../../public/static/Music.svg";

import Link from "next/link";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		addBtn: {
			right: "20px",
			bottom: "30px",
			position: "fixed",
		},
		container: {
			padding: theme.spacing(2),
			position: "relative",
			minHeight: "100px",
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

	return {
		props: {
			id,
			title,
			currentPage: {
				title: title || `起床铃投票`,
				path: `/music?id=${id}&title=${title}`,
			},
		},
	};
}

const editModule = () => {
	return <Button></Button>;
};

const Music = ({ userData = {}, id }: { id: number; userData: IUserData }) => {
	const classes = useStyles();
	const [detail, setDetail] = useState({
		title: "未命名",
		description: "暂无描述",
		isInitial: true,
		statu: 0,
		deadline: "",
	});
	const [musicList, setMusicList] = useState([]);
	const [currentAudio, setCurrentAudio] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const validMusics = musicList.filter((music) => music.statu == 0);

	useEffect(() => {
		setIsLoading(true)
		Axios.all([
			Axios.get(`/api/music/getVoteDetail?id=${id}`),
			Axios.get(`/api/music/getVoteMusics?vote_id=${id}`),
		]).then(
			Axios.spread((...res) => {
				setDetail(res[0].data.data);
				setMusicList(res[1].data.musicData);
			})
		).then(() => {
			setIsLoading(false)

		});;
	}, [])

	// vote等于0表示取消投票
	const handleVote = (musicId: number, vote) => {
		Axios.get(
			`/api/music/voteMusic?musicId=${musicId}&vote=${vote}`
		).then((res) => {
			switch (res.status) {
				case 201:
					var newList = [...musicList];
					for (const i in newList) {
						if (newList[i].id === musicId) {
							newList[i].voter = res.data.currentVoter;
							newList[i].vote = res.data.currentVote;
							break
						}
					}
					setMusicList(newList);
				default:
					window.snackbar({
						message: "X " + res.data.message,
					});
					break;
			}
		});
	};

	// TODO 热度排序

	// musics.sort((a, b) => {
	// 	return b.vote - a.vote;
	// });

	// TODO 根据日期自动判断是否结束

	const handleDelete = (musicId: number) => {
		Axios.get(`/api/music/deleteMusic?musicId=${musicId}`).then(
			(res) => {
				switch (res.status) {
					case 200:
						var newList = [...musicList];
						for (const i in newList) {
							if (newList[i].id === musicId) {
								newList[i].statu = 1
								break
							}
						}
						setMusicList(newList);
						break;
					default:
						window.snackbar({
							message: "",
						});
						break;
				}
			}
		);

	};

	 // PRIORITY 分享
	 // PRIORITY 投票前隐藏票数

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
			{!!validMusics.length && (
				<List component={Paper} aria-label="music list">
					{validMusics.map((song, i) => {
						let isVoted = JSON.parse(song.voter).includes(userData.id) || 0;

						return (
							<MusicItem
								isAdmin={
									userData ? userData.isAdmin : false
								}
								isVoted={isVoted}
								index={i}
								vote={song.vote}
								reason={song.reason}
								lyrics={song.lyrics}
								currentIndex={currentAudio}
								handlePlayIndexChange={setCurrentAudio}
								handleVote={() =>
									handleVote(song.id, isVoted ? -1 : 1)
								}
								handleDelete={() => handleDelete(song.id)}
								playUrl={song.playUrl}
								title={song.title}
								artist={song.artist}
								key={song.id}
							/>
						);
					})}

				</List>
			)}

			{!!!validMusics.length && !isLoading && (
				<Typography variant="h6" align="center">
					暂时没有音乐，赶快投稿吧
				</Typography>
			)}

			{isLoading && <Loader />}

			<Link href={`/music/add?id=${id}&title=${detail.title}`}>
				<Fab
					className={classes.addBtn}
					color="primary"
					aria-label="上传音乐"
					variant="extended"
				>
					<AddIcon />
					上传音乐
				</Fab>
			</Link>
		</>
	);
};

export default Music;
