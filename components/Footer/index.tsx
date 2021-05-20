import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		footer: {
			"--flow-space": "0.75rem",
			// backgroundColor: "#888",
			minHeight: "120px"
		},
	})
);

const Footer = () => {
	const classes = useStyles();
	return (
		<footer className={classes.footer}>
			<Divider />
		sadf
		</footer>
	);
};

export default Footer;
