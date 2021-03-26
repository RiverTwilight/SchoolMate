import React, { useState } from "react";
import Layout from "../../components/Layout";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

export async function getServerSideProps(context) {
	const config = await import(`../../data/config.json`);

	// const detail = await fetch(``)

	return {
		props: {
			siteConfig: config.default,
		},
	};
}

/**
 * 创建投票
 */

const CreateVote = ({ id, siteConfig, locale, title }) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch("/music/createVote", {
			method: "POST",
			//@ts-expect-error
			body: new FormData(e.target),
		})
			.then(function (response) {
				if (response.ok) {
					console.log(response.json());
				}
			})
			.then(function (data) {
				console.log(data);
			})
			.catch(function (error) {
				console.warn(error);
			});
	};
	return (
		<Layout
			currentPage={{
				text: "创建投票",
				path: "/music/create",
			}}
			locale={locale}
			config={siteConfig}
		>
			<form onSubmit={handleSubmit}>
				<TextField
					required
					defaultValue="第一周起床铃投票"
					type="text"
					name="title"
				></TextField>
				<TextField type="text" name="describe"></TextField>
				<TextField type="date" required name="deadline"></TextField>
				<br />
				<br />
				<Button variant="contained" color="primary" type="submit">
					确定
				</Button>
			</form>
		</Layout>
	);
};

export default CreateVote;
