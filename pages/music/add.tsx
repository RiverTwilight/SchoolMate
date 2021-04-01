import React, { useState } from "react";
import Layout from "../../components/Layout";
import Checkbox from "@material-ui/core/Checkbox";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import { useRouter } from 'next/router'
import parseFormData from "../../utils/parseFormData"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
        },
    })
);

export async function getStaticProps(context) {
    const config = await import(`../../data/config.json`);
    const { id } = context.query
    return {
        props: {
            siteConfig: config.default,
            id
        },
    };
}

/**
 * 创建投票
 */

const AddMusic = ({ userData, id }) => {
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-expect-error
        const formData = new FormData(e.target);
        //api /pages/api/uploadMusic
        fetch("/api/music/AddMusic", {
            method: "POST",
            body: JSON.stringify(
                Object.assign(
                    { id },
                    parseFormData(
                        ["musicUrl", "reason"],
                        formData
                    )
                )
            ),
        })
            .then((res) => {
                switch (res.status) {
                    case 301:
                        window.snackbar({
                            message: "服务器错误"
                        });
                        break;
                    case 200:
                        return res.json()
                }
            })
            .then((data) => {
                router.push(`/music?id=${data.id}`)
            })
            .catch(function (error) {
                console.warn(error);
            });
    };
    const today = new Date();
    const classes = useStyles();
    return (
        <Paper
            component={"form"}
            className={classes.container}
            //@ts-expect-error
            onSubmit={handleSubmit}
        >
            <FormControl fullWidth>
                <TextField
                    type="text"
                    label="投票理由"
                    rows={3}
                    multiline
                    name="description"
                ></TextField>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    type="url"
                    label="歌曲平台链接或文件直链"
                    name="musicUrl"
                    helperText="可通过分享-复制链接获得，目前仅支持QQ音乐"
                ></TextField>
            </FormControl>
            <br />
            <br />
            <Button variant="contained" color="primary" type="submit">
                确定
				</Button>
        </Paper>
    );
};

const Page = ({ id, siteConfig, locale, title }) => (
    <Layout
        currentPage={{
            text: "歌曲投稿",
            path: "/music/add",
        }}
        locale={locale}
        config={siteConfig}
    >
        <AddMusic />
    </Layout>
)


export default Page;
