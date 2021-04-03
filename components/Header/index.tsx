import * as React from "react";
import Logo from "../../static/logo.svg";
import Hidden from "@material-ui/core/Hidden";
import ActiveLink from "../../utils/AcitiveLink";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import MenuTwoToneIcon from "@material-ui/icons/MenuTwoTone";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import clsx from "clsx";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useRouter } from "next/router";

function ElevationScroll(props: Props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

interface Props {
	children: React.ReactElement;
}

const drawerWidth = 0;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			flexGrow: 1,
		},
		appBar: {
			[theme.breakpoints.up("sm")]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			// [theme.breakpoints.up("sm")]: {
			//     display: "none",
			// },
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
	})
);

export default (props: any) => {
	const { handleLogin, open, currentPage, userData } = props;
	const classes = useStyles();
	const router = useRouter();

	const handleClickUser = () => {
		if (!!userData) {
			router.push("/user");
		} else {
			handleLogin && handleLogin();
		}
	};

	return (
		<ElevationScroll {...props}>
			<AppBar
				position="fixed"
				color="inherit"
				className={clsx(classes.appBar)}
			>
				<Toolbar>
					<Hidden xsDown>
						<IconButton
							color="primary"
							aria-label="open drawer"
							// onClick={handleLeftDrawerOpen}
							edge="start"
							className={classes.menuButton}
						>
							{/* <MenuTwoToneIcon /> */}
						</IconButton>
					</Hidden>
					<Hidden smUp>
						<Logo></Logo>
					</Hidden>
					<Hidden xsDown>
						<img src="/static/image/200x50.png"></img>
					</Hidden>

					<Typography
						color="primary"
						variant="h6"
						className={classes.title}
					>
						&nbsp;{currentPage.text}
						{/* {""}
                        <Hidden xsDown>
                            <ActiveLink activeClassName="" href="/">
                                <Button size="large">投票</Button>
                            </ActiveLink>
                        </Hidden> */}
					</Typography>
					<Button
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						startIcon={<AccountCircle />}
						size="large"
						onClick={handleClickUser}
					>
						{!!userData ? userData.name : "登录"}
					</Button>
				</Toolbar>
				<Divider />
			</AppBar>
		</ElevationScroll>
	);
};
