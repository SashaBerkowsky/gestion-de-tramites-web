import { useEffect, useState } from "react";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "react-query";
import { getProcedureObservations } from "../api/procedures";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";

export default function AlertDialog({ isopen, closeDialog }) {
	const { idProcedure } = useParams();
	const [sortedObservations, setSortedObservations] = useState([]);

	const {
		isLoading,
		data: observations,
		isError,
		error,
	} = useQuery(["getProcedureObservations"], () =>
		getProcedureObservations(idProcedure)
	);

	useEffect(() => {
		if (observations) {
			setSortedObservations(
				observations.sort(function (a, b) {
					const dateA = Number(moment(a.eventDate).format("yyyyMMDD"));
					const dateB = Number(moment(b.eventDate).format("yyyyMMDD"));
					if (dateA > dateB) {
						return 1;
					}
					if (dateA < dateB) {
						return -1;
					}
					// a must be equal to b
					return 0;
				})
			);
		}
	}, [observations]);

	if (isLoading) return <Loader />;

	if (isError) return <ErrorAlert message={error.message} />;

	return (
		<div>
			<Dialog
				open={isopen}
				onClose={closeDialog}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle sx={{ paddingTop: 4 }} id='alert-dialog-title'>
					{"Observaciones"}
				</DialogTitle>

				<IconButton
					aria-label='close'
					onClick={closeDialog}
					sx={{
						position: "absolute",
						right: 15,
						top: 15,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>

				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						<ul>
							{sortedObservations.map((obs, i) => (
								<li style={{ marginBottom: 30 }} key={i}>
									{console.log(moment(obs.eventDate).format("MM/DD/yyyy"))}
									{moment(obs.eventDate).format("DD/MM/yyyy")}
									{" - " + obs.observation}
								</li>
							))}
						</ul>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}
