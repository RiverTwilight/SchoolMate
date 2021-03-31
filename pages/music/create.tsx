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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
        },
    })
);

export async function getStaticProps(context) {
    const config = await import(`../../data/config.json`);

    return {
        props: {
            siteConfig: config.default,
        },
    };
}

/**
 * 创建投票
 */

const CreateVote = ({ userData }) => {
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-expect-error
        const formData = new FormData(e.target);
        const parseFormData = (
            keys: string[],
            formData: FormData
        ): {
            [key: string]: unknown;
        } => {
            var res = {};
            keys.forEach((key) => {
                res[key] = formData.get(key) || "";
            });
            return res;
        };
        fetch("/api/music/createVote", {
            method: "POST",
            body: JSON.stringify(
                Object.assign(
                    { musics: "{}" },
                    parseFormData(
                        ["title", "deadline", "description"],
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
                    case 205:
                         window.snackbar({
                            message: res.json().message
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
                    required
                    defaultValue="第一周起床铃投票"
                    type="text"
                    label="投票名称"
                    name="title"
                ></TextField>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    type="text"
                    label="描述（可选）"
                    rows={3}
                    multiline
                    name="description"
                ></TextField>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    label="截止日期"
                    defaultValue={`${
                        today.getMonth() + 1
                        }-${today.getDate()}-${today.getFullYear()}`}
                    type="date"
                    name="deadline"
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
            text: "创建投票",
            path: "/music/create",
        }}
        locale={locale}
        config={siteConfig}
    >
        <CreateVote />
    </Layout>
)


export default Page;
