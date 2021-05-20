import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		footer: {
			"--flow-space": "0.75rem",
			backgroundColor: "#888",
		},
	})
);

const Footer = () => {
	const classes = useStyles();
	return <footer className={classes.footer}>sadf</footer>;
};

export default Footer;
