import React, { useState, useEffect, createRef, useRef } from "react";
import Layout from "../../components/Layout";
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
    index,
    currentIndex,
    playUrl,
    handlePlayIndexChange

}: {
    name: string,
    playUrl: string,
    index: number,
    currentIndex: number,
    handlePlayIndexChange: (index: number) => void
}) => {
    const audioDom = useRef<HTMLAudioElement>(null);
    const classes = useStyles();
    const [onPlay, setOnPlay] = useState(false);

    useEffect(() => {
        if (currentIndex !== index) {
            audioDom.current.pause();
        }
    }, [currentIndex])

    const handleClick = () => {
        setOnPlay(!onPlay);

        handlePlayIndexChange(index)

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
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleClick}
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
        fetch(`/api/getMusicDetail?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSonglist(data.musics);
            });
    }, [id]);

    return (
        <Layout
            currentPage={{
                text: title || "起床铃投票",
                path: `/music?id=${id}`,
            }}
            locale={locale}
            config={siteConfig}
        >
            <List component={Paper} aria-label="music list">
                {songlist.map((song, i) => <MusicItem
                    index={i}
                    currentIndex={currentAudio}
                    handlePlayIndexChange={setCurrentAuido}
                    playUrl={song.playUrl}
                    name={song.name}
                    key={song.name}
                />)}
            </List>
        </Layout>
    );
};

export default Music;
