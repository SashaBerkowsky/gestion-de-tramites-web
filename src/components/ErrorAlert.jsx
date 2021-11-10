import { Alert, Box } from "@mui/material";

const ErrorAlert = ({ message }) => {
	return (
		<Box>
			<Alert severity='error' variant='filled'>
				<strong>Error</strong> - {message}
			</Alert>
		</Box>
	);
};

export default ErrorAlert;
