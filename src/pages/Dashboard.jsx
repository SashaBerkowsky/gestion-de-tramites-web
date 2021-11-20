import { Grid } from "@mui/material";
import CounterCard from "../components/CounterCard";

const DashboardPage = () => {
	return (
		<div>
			<iframe
				src='http://localhost:3000/d-solo/8sQHaxcnz/estados?orgId=1&from=1637403271234&to=1637424871234&theme=light&panelId=2'
				width='100%'
				height='500'
				title='FIWARE-GRAFANA'
				frameborder='0'
			></iframe>
		</div>
	);
};

export default DashboardPage;
