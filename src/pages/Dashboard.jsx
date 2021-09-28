import { Grid } from "@mui/material";
import CounterCard from "../components/CounterCard";

const DashboardPage = () => {
	return (
		<div>
			<Grid container spacing={5} sx={{ paddingBottom: 2 }}>
				<CounterCard title='Pendientes de analisis' counter='10' />
				<CounterCard title='En proceso de analisis' counter='5' />
			</Grid>
		</div>
	);
};

export default DashboardPage;
