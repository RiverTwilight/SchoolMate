import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useRouter } from "next/router";
import parseFormData from "../../utils/parseFormData";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Axios from "axios";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

export async function getServerSideProps(context) {
    const config = await import(`../../data/config.json`);
    const { id, title } = context.query;
    return {
        props: {
            siteConfig: config.default,
            id,
            title,
        },
    };
}

/**
 * 歌曲投稿
 */

const AddMusic = ({ userData, id, title }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        //@ts-expect-error
        const formData = new FormData(e.target);
        Axios.post(
            "/api/music/uploadMusic",
            Object.assign(
                { id },
                parseFormData(
                    ["musicUrl", "reason", "title", "artist"],
                    formData
                )
            )
        )
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    setIsLoading(false);
                    router.push(`/music?id=${res.data.id}`);
                } else {
                    window.snackbar({
                        message: res.data.message,
                    });
                }
            })
            .catch(function (error) {
                console.warn(error);
            });
    };
    const handleBack = () => {
        router.back();
    };
    const classes = useStyles();
    return (
        <Paper
            component={"form"}
            className={classes.container}
            //@ts-expect-error
            onSubmit={handleSubmit}
        >
            <AppBar elevation={0} color="inherit" position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        aria-label="open drawer"
                        onClick={handleBack}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <FormControl fullWidth>
                <TextField
                    type="text"
                    label="投票理由"
                    rows={3}
                    multiline
                    name="reason"
                    required
                ></TextField>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    type="text"
                    label="歌曲名称"
                    name="title"
                    required
                ></TextField>
            </FormControl>
            <FormControl fullWidth>
                <TextField type="text" label="歌手" name="artist"></TextField>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    type="url"
                    label="歌曲平台链接或文件直链"
                    required
                    name="musicUrl"
                    helperText="可通过分享-复制链接获得，目前仅支持网易云音乐"
                ></TextField>
            </FormControl>
            <br />
            <br />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <InfoTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText secondary="每人每期只有一次投稿机会，歌曲一经上传无法撤回，若发现恶意投稿者将封禁账号，请慎重。" />
                </ListItem>
            </List>
            <Button
                disabled={isLoading}
                variant="contained"
                color="primary"
                type="submit"
            >
                确定
            </Button>
        </Paper>
    );
};

const Page = (props) => (
    <Layout
        currentPage={{
            text: "歌曲投稿",
            path: "/music/add",
        }}
        locale={props.locale}
        config={props.siteConfig}
    >
        <AddMusic {...props} />
    </Layout>
);

export default Page;
