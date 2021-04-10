import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PlayArrowTwoToneIcon from "@material-ui/icons/PlayArrowTwoTone";
import PauseCircleFilledTwoToneIcon from "@material-ui/icons/PauseCircleFilledTwoTone";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import Fab from "@material-ui/core/Fab";
import Link from "next/link";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        audio: {
            display: "none",
        },
        addBtn: {
            right: "20px",
            bottom: "20px",
            position: "fixed",
        },
        container: {
            padding: theme.spacing(2)
        }
    }
    ));

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
    title,
    index,
    id,
    currentIndex,
    playUrl,
    vote,
    artist,
    reason,
    isAdmin,
    musicId,
    handlePlayIndexChange,
    handleVote
}: {
    title: string;
    vote: number;
    artist: string;
    reason: string;
    playUrl: string;
    isAdmin: boolean;
    index: number;
    id: number;
    musicId: number;
    currentIndex: number;
    handlePlayIndexChange: (index: number) => void;
    handleVote: (musicId: number) => void
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
        Axios.get(`/api/music/deleteMusic?id=${id}`)
            .then((data) => {
                switch (data.status) {
                    case 201:
                        window.snackbar({
                            message: ""
                        })
                        break;
                }
            });
    };

    return (
        <>
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
                        startIcon={<ThumbUpAltTwoToneIcon />}
                    >
                        {vote}
                    </Button>
                    {!!isAdmin && (
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

const Music = ({ userData = {}, id }: { id: number }) => {
    const classes = useStyles();
    const [detail, setDetail] = useState({
        title: "未命名",
        musics: "[]",
        description: "暂无描述"
    });
    const [currentAudio, setCurrentAudio] = useState(0);

    useEffect(() => {
        fetch(`/api/music/getMusicDetail?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setDetail(data.musicData);
            });
    }, []);

    const handleVote = (musicId) => {
        Axios.get(
            `/api/music/voteMusic?id=${id}&musicId=${musicId}&userId=${userData.id}`
        ).then((data) => {
            switch (data.status) {
                case 201:
                    window.snackbar({
                        message: "X " + data.data.message
                    })
                    break;
                default:
                    var newObj = Object.assign({}, detail, {
                        musics: JSON.stringify(data.data.currentMusics)
                    });
                    setDetail(newObj)
            }

        });
    };

    const musics = detail.musics === "[]" ? [] : JSON.parse(detail.musics)
    
    musics.sort((a, b)=>{
        return b.votes - a.votes
    })

    console.log(musics)

    // TODO 根据日期自动判断是否结束
    // TODO 根据票数排名

    return (
        <>
            <Paper className={classes.container}>
                <Typography variant="h5">{detail.title}</Typography>
                {!!detail.description && (
                    <Typography variant="body1">{detail.description}</Typography>
                )}
                {detail.statu == 0 ? (
                    <Chip
                        color="primary"
                        icon={<AlarmOnIcon />}
                        label={`进行中 - 截止日期：${
                            detail.deadline.split("T")[0]
                            }`}
                    />
                ) : (
                        <Chip icon={<AlarmOnIcon />} label="投票已结束" />
                    )}
            </Paper>
            <br />
            {!!musics.length && (
                <List component={Paper} aria-label="music list">
                    {musics.map((song, i) => (
                        <MusicItem
                            isAdmin={userData ? userData.isAdmin : false}
                            index={i}
                            id={id}
                            musicId={i}
                            vote={song.vote}
                            reason={song.reason}
                            currentIndex={currentAudio}
                            handlePlayIndexChange={setCurrentAudio}
                            handleVote={() => handleVote(i)}
                            playUrl={song.playUrl}
                            title={song.title}
                            artist={song.artist}
                            key={i + song.title}
                        />
                    ))}
                </List>
            )}
            {!!!musics.length && (<Loader />)}
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

export default Page;
