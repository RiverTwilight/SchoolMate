import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../utils/theme";
import Snackbar from "@material-ui/core/Snackbar";
import siteConfig from "@/data/config.json";

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
			autoHideDuration={6000}
			onClose={handleSnackbarClose}
		/>
	);
};

const Layout = (props: {
	currentPage: ICurrentPage;
	children: JSX.Element[] | JSX.Element;
}) => {
	const { currentPage } = props;
	const { description, author, root } = siteConfig;

	// const childrenWithProps = React.Children.map(
	// 	this.props.children,
	// 	(child) => {
	// 		// checking isValidElement is the safe way and avoids a typescript error too
	// 		const props = { locale };
	// 		if (React.isValidElement(child)) {
	// 			return React.cloneElement(child, props);
	// 		}
	// 		return child;
	// 	}
	// );

	const formedTitle = `${currentPage ? `${currentPage.title} - ` : ""}${
		siteConfig.title
	}`;

	return (
		<ThemeProvider theme={theme({})}>
			<Head>
				<meta name="description" content={description} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={formedTitle} />
				<meta property="og:url" content={root} />
				<meta property="og:site_name" content={formedTitle} />
				<meta property="og:description" content={description} />
				<meta property="og:locale" content="zh_CN" />
				<meta property="article:author" content={author.name} />
				<meta property="article:tag" content={author.name} />
				<meta property="article:tag" content={formedTitle} />
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

				<meta name="theme-color" content="#ffffff"></meta>
				<title>{formedTitle}</title>
			</Head>
			{props.children}
			<GlobalSnackbar />
		</ThemeProvider>
	);
};

export default Layout;
