import React, { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import { useRouter } from 'next/router'
import Axios from "axios"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
        },
    })
);

export async function getStaticProps() {
    const config = await import(`../../data/config.json`);

    return {
        props: {
            siteConfig: config.default,
            currentPage: {
                title: "创建投票",
                path: "/music/create"
            }
        },
    };
}

/**
 * 创建投票
 */

const CreateVote = ({ userData }) => {
    const router = useRouter();
    const today = new Date();
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
        Axios.post("/api/music/createVote",
            Object.assign(
                { musics: "[]", createDate: today.toISOString() },
                parseFormData(
                    ["title", "deadline", "description"],
                    formData
                )
            )
        )
            .then((res) => {
                switch (res.status) {
                    case 400:
                        window.snackbar({
                            message: res.data.message
                        });
                        break;
                    case 200:
                        router.push(`/music?id=${res.data.id}&title=${res.data.title}`)
                }
            })
            .catch(function (error) {
                console.warn(error);
            });
    };
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
                    defaultValue={`${today.getMonth() + 1
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

export default CreateVote;
