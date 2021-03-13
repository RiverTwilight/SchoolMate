import * as React from "react";
import Logo from "../../static/logo.svg";
import LogoLarge from "../../static/logo&title-small.svg";
import Text from "../../front-end/utils/i18n";
import { nav } from "../../data/i18n.json";
import ActiveLink from "../../front-end/utils/AcitiveLink";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuTwoToneIcon from "@material-ui/icons/MenuTwoTone";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import clsx from "clsx";
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
            [theme.breakpoints.up("sm")]: {
                display: "none",
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
    })
);

export default (props: any) => {
    const { handleLogin, open, currentPage } = props;
    const classes = useStyles();
    
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
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="primary"
                        onClick={handleLogin}
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
                <Divider />
            </AppBar>
        </ElevationScroll>
    );
};
