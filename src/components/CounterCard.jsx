import { Card, CardContent, Grid, Typography } from "@mui/material";

const CounterCard = ({ title, counter }) => {
	return (
		<Grid item xs={4}>
			<Card>
				<CardContent>
					<Typography
						variant='button'
						color='text.secondary'
						sx={{ fontWeight: "bold" }}
					>
						{title}
					</Typography>
					<Typography
						variant='h5'
						color='text.primary'
						sx={{ fontWeight: "bold" }}
					>
						{counter}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default CounterCard;
