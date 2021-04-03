import React, { useState } from "react";
import Layout from "../../components/Layout";
import Checkbox from "@material-ui/core/Checkbox";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useRouter } from "next/router";
import parseFormData from "../../utils/parseFormData";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			padding: theme.spacing(2),
		},
	})
);

export async function getServerSideProps(context) {
	const config = await import(`../../data/config.json`);
	console.log(context);
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
    const [isLoading, setIsLoading] = useState(false)
	const router = useRouter();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
		//@ts-expect-error
		const formData = new FormData(e.target);
		//api /pages/api/uploadMusic
		fetch("/api/music/uploadMusic", {
			method: "POST",
			body: JSON.stringify(
				Object.assign(
					{ id },
					parseFormData(
						["musicUrl", "reason", "title", "artist"],
						formData
					)
				)
			),
		})
			.then((res) => {
				switch (res.status) {
					case 204:
						window.snackbar({
							message: res.json().message,
						});
						break;
					case 200:
						return res.json();
				}
			})
			.then((data) => {
                setIsLoading(false)
				// router.push(`/music?id=${data.id}`)
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
			{title}
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
			<Button disabled={isLoading} variant="contained" color="primary" type="submit">
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
