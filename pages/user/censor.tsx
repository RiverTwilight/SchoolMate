import React, { useState, useEffect, createRef, useRef } from "react";
import Layout from "../../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
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

export async function getServerSideProps(context: { query: { id: any; }; }) {
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
    playUrl
}: {
    name: string,
    playUrl: string
}) => {
    const audioDom = useRef<HTMLAudioElement>(null);
    const classes = useStyles();
    const [onPlay, setOnPlay] = useState(false);

    const handleClick = () => {
        setOnPlay(!onPlay);

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
        setOnPlay(true)
    }

    const handleDelete = () => {
        // TODO 删除歌曲
    }

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
                        {onPlay ? (
                            <PauseCircleFilledTwoToneIcon />
                        ) : (
                                <PlayArrowTwoToneIcon />
                            )}
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleClick}
                    >
                        <ThumbUpAltTwoToneIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        <ThumbUpAltTwoToneIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <audio
                onEnded={handleAudioEnded}
                onPlay={handleAudioPlay}
                className={classes.audio}
                controls={true}
                ref={audioDom}
            >
                <source
                    src={playUrl}
                    type="audio/mpeg"
                />
					Your browser does not support the audio tag.
                </audio>
        </>
    )
}

/**
 * 投票详情
 */

const Music = ({ id, siteConfig, locale, title }) => {
    const [songlist, setSonglist] = useState([]);
    const [currentAudio, setCurrentAuido] = useState(0);

    useEffect(() => {
        // TODO 检查是否登录
        fetch(`/api/getMusicDetail?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSonglist(data.musics);
            });
    }, [id]);

    const handleClose = () => {
        // TODO 结束投票
    }

    return (
        <Layout
            currentPage={{
                text: title || "审核",
                path: "/user/censor" + id,
            }}
            locale={locale}
            config={siteConfig}
        >
            <Typography variant="h4"></Typography>
            <Button onClick={handleClose} variant="contained">结束投票</Button>
            <List component={Paper} aria-label="music list">
                {songlist.map((song, i) => <MusicItem
                    playUrl={song.playUrl}
                    name={song.name}
                    key={song.name}
                />)}
            </List>
        </Layout>
    );
};

export default Music;
