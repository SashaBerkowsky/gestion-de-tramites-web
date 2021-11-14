import { Grid } from "@mui/material";
import CounterCard from "../components/CounterCard";

const DashboardPage = () => {
	return (
		<div>
			<Grid container spacing={5} sx={{ paddingBottom: 4 }}>
				<CounterCard title='Pendientes de analisis' counter='10' />
				<CounterCard title='En proceso de analisis' counter='5' />
			</Grid>

			<iframe
				src='http://localhost:3000/d-solo/_4d0R-cnk/new-dashboard-copy?orgId=1&from=1636907201276&to=1636928801276&theme=light&panelId=2'
				width='100%'
				height='500'
				title='FIWARE-GRAFANA'
				frameborder='0'
			></iframe>
		</div>
	);
};

export default DashboardPage;
