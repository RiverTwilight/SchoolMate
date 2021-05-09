import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

export default ({
	onClose,
	open,
	lyrics,
	title,
}: {
	lyrics: string;
	open: boolean;
	title: string;
	onClose: () => void;
}) => {
	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle id="simple-dialog-title">歌词 - {title}</DialogTitle>
			<DialogContent>
				<Typography variant="body" align="center">
					{lyrics}
				</Typography>
			</DialogContent>
		</Dialog>
	);
};
