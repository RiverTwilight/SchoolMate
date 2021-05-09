// import App from "next/app";
import Header from "../components/Header";
import Login from "../components/Login";
import GlobalContext from "../components/GlobalContext";
import { useState, useEffect } from "react";
import {
	createMuiTheme,
	makeStyles,
	createStyles,
	Theme as AugmentedTheme,
	ThemeProvider,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import theme from "../components/theme";
import Layout from "../components/Layout";
import "./App.css";

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
}));

function MyApp({ Component, pageProps }) {
	const {
		currentPage = {
			title: "404",
		},
		siteConfig,
		locale,
	} = pageProps;
	// console.log(currentPage);
	const classes = useStyles();
	const [userData, setUserData] = useState({});
	const [open, setOpen] = useState(false);
	useEffect(() => {
		!!!userData.name &&
			fetch(`/api/getUserInfo`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.user) {
						setUserData(data.user);
					} else {
						// setOpen(true);
					}
				});
	}, [Component]);
	const handleLoginClose = () => {
		setOpen(false);
	};
	const handleLogin = () => {
		setOpen(true);
	};
	// React.useEffect(() => {
	// 	// Remove the server-side injected CSS.
	// 	const jssStyles = document.querySelector("#jss-server-side");
	// 	if (jssStyles) {
	// 		jssStyles.parentElement.removeChild(jssStyles);
	// 	}
	// }, []);
	return (
		<>
			<GlobalContext.Provider value={{ userData }}>
				<Layout
					siteConfig={siteConfig}
					locale={locale}
					currentPage={currentPage}
				>
					<div className="root">
						<Login
							cbUrl={`${currentPage.path}`}
							onClose={handleLoginClose}
							open={open}
						/>
						<Header
							userData={userData}
							handleLogin={handleLogin}
							title={currentPage.title}
						/>

						<main className="content">
							<div className="toolbar" />
							<Component userData={userData} {...pageProps} />
						</main>
					</div>
				</Layout>
			</GlobalContext.Provider>
		</>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     console.log(appProps);

//     return { ...appProps };
// };

export default MyApp;
