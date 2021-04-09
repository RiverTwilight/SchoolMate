import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../Header";
import Login from "../Login";
import {
	createStyles,
	Theme,
	withStyles,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../utils/theme";
import Snackbar from "@material-ui/core/Snackbar";

/**
 * 全局snackbar
 */
const GlobalSnackbar = () => {
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarConfig, setSnackbarConfig] = useState({
		message: "无消息",
	});
	useEffect(() => {
		window.snackbar = (config) => {
			setSnackbarConfig(config);
			setOpenSnackbar(true);
		};
	});
	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};
	return (
		<Snackbar
			{...snackbarConfig}
			open={openSnackbar}
			onClose={handleSnackbarClose}
		/>
	);
};

const styles = (theme: Theme) => {
	return createStyles({
		root: {
			display: "flex",
			justifyContent: "center",
            background: "#f6f6f6"
		},
		content: {
			flexGrow: 1,
			paddingTop: "75px",
			minHeight: "100vh",
			position: "relative",
            maxWidth: "1000px",
		},
	});
};

class Layout extends React.Component<
	{
		/**网站配置 */
		config: ISiteConfig;
		/** 当前页面 */
		currentPage: ICurrentPage;
		/**目录 */
		catalog?: any[];
		locale?: string;
		classes: any;
	},
	{
		userData: undefined;
		openLogin: boolean;
	}
> {
	constructor(props) {
		super(props);
		this.state = {
			userData: null,
			openLogin: false,
		};
	}
	componentDidMount = () => {
		fetch(`/api/getUserInfo`)
			.then((res) => res.json())
			.then((data) => {
				if (data.user) {
					this.setState({ userData: data.user });
				}
			});
	};
	handleLogin = () => {
		this.setState({
			openLogin: true,
		});
	};
	handleLoginClose = () => {
		this.setState({
			openLogin: false,
		});
	};
	render() {
		const { config, currentPage, catalog, locale, classes } = this.props;
		const { openLogin, userData } = this.state;
		const { description, author, title } = config;
		const showTitle = `${
			currentPage ? `${currentPage.text} - ` : ""
		}${title}`;
		const childrenWithProps = React.Children.map(
			this.props.children,
			(child) => {
				// checking isValidElement is the safe way and avoids a typescript error too
				const props = { locale, userData };
				if (React.isValidElement(child)) {
					return React.cloneElement(child, props);
				}
				return child;
			}
		);
		return (
			<ThemeProvider theme={theme({})}>
				<Head>
					<meta name="description" content={description} />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={showTitle} />
					<meta
						property="og:url"
						content="https://cflsgx-mate.vercel.app"
					/>
					<meta property="og:site_name" content={showTitle} />
					<meta property="og:description" content={description} />
					<meta property="og:locale" content="zh_CN" />
					<meta property="article:author" content={author.name} />
					<meta property="article:tag" content={author.name} />
					<meta property="article:tag" content={showTitle} />
					<meta
						name="google-site-verification"
						content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I"
					/>
					<meta name="twitter:card" content="summary" />
					<meta name="viewport" content="viewport-fit=cover" />
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,maximum-scale=1,user-scaleable=0"
					/>
					<title>{showTitle}</title>
				</Head>
				<Header
					userData={userData}
					handleLogin={this.handleLogin}
					lang={locale}
					{...this.props}
				/>
				<Login
					cbUrl={"/"}
					onClose={this.handleLoginClose}
					open={openLogin}
				/>
				<main className={classes.root}>
					<div className={classes.content}>{childrenWithProps}</div>
				</main>
				<GlobalSnackbar />
			</ThemeProvider>
		);
	}
}

export default withStyles(styles)(Layout);
