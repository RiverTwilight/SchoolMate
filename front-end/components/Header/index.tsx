import * as React from "react";
import Logo from "../../static/logo.svg";
import LogoLarge from "../../static/logo&title-small.svg";
import Text from "../../utils/i18n";
import { nav } from "../../data/i18n.json";
import ActiveLink from "../../utils/AcitiveLink";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuTwoToneIcon from "@material-ui/icons/MenuTwoTone";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import clsx from "clsx";

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

const drawerWidth = 200;

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
			[theme.breakpoints.up("sm")]: {
				display: "none",
			},
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
	})
);

export default (props: any) => {
	const { handleLeftDrawerOpen, open, currentPage } = props;
	const classes = useStyles();
	const [extraButton, setExtraButton] = React.useState(null);

	return (
		<ElevationScroll {...props}>
			<AppBar
				position="fixed"
				color="inherit"
				className={clsx(classes.appBar)}
			>
				<Toolbar>
					{/* <IconButton
						color="primary"
						aria-label="open drawer"
						onClick={handleLeftDrawerOpen}
						edge="start"
						className={classes.menuButton}
					>
						<MenuTwoToneIcon />
					</IconButton> */}
					<Typography
						color="primary"
						variant="h6"
						className={classes.title}
					>
						{currentPage.text}
					</Typography>
					{extraButton}
				</Toolbar>
				<Divider />
			</AppBar>
		</ElevationScroll>
	);
};
