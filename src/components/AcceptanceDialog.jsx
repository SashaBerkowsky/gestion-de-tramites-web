import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Select from "@mui/material/Select";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { getUsersResponsible } from "../api/user";
import { putUserResponsible } from "../api/procedures";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";

function AcceptanceDialog({ onClose, open, idProcedure }) {
	const [selectedPerson, setSelectedPerson] = useState("");
	let history = useHistory();

	const handleChange = (event) => {
		setSelectedPerson(event.target.value);
	};

	const handleClose = (isSuccess) => {
		onClose(isSuccess);
	};

	const {
		isLoading,
		data: usersResponsible,
		isError,
		error,
	} = useQuery(["getUsersResponsible"], () => getUsersResponsible());

	const {
		mutateAsync: putUserMutation,
		isLoading: isMutationLoading,
		isError: isErrorInMutation,
	} = useMutation(
		(mutationData) => {
			putUserResponsible(mutationData.idProcedure, mutationData.selectedPerson);
		},
		{
			onError: () => {
				alert("error");
			},
		}
	);

	if (isLoading || isMutationLoading) return <Loader />;

	if (isError) return <ErrorAlert message={error.message} />;

	if (isErrorInMutation)
		return <ErrorAlert message='Error al asignar usuario responsable' />;

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Seleccione al responsable de aprobación</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					<FormControl variant='standard' sx={{ m: 1, minWidth: 220 }}>
						<InputLabel id='demo-simple-select-standard-label'>
							Responsable
						</InputLabel>
						<Select
							labelId='demo-simple-select-standard-label'
							id='demo-simple-select-standard'
							value={selectedPerson}
							onChange={handleChange}
							label='Evaluador'
						>
							{usersResponsible.map((userRes, idx) => (
								<MenuItem
									key={idx}
									value={userRes.id}
								>{`${userRes.name} ${userRes.surname}`}</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ padding: 2 }}>
				<Button onClick={handleClose} color='info' variant='contained'>
					Cancelar
				</Button>
				<Button
					onClick={async () => {
						await putUserMutation({ idProcedure, selectedPerson });
						handleClose(true, "El usuario responsable fue asignado con exito!");
					}}
					autoFocus
					color='secondary'
					variant='contained'
					disabled={!selectedPerson || isMutationLoading}
				>
					Aprobar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AcceptanceDialog;
