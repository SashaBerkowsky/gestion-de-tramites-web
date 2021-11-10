import { Alert, Snackbar } from "@mui/material";
import { useHistory } from "react-router-dom";

const PopUpMsg = ({ message, isOpen, to, variety }) => {
	let history = useHistory();

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={3000}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			onClose={() => {
				history.push(to);
			}}
		>
			<Alert severity={variety} variant='filled'>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default PopUpMsg;
