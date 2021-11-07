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
import Select from "@mui/material/Select";
import Loader from "../components/Loader";
import { getUsersResponsible } from "../api/user";
import { putUserResponsible } from "../api/procedures";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";

function AcceptanceDialog({ onClose, selectedValue, open, idProcedure }) {
	const [selectedPerson, setSelectedPerson] = useState("");
	let history = useHistory();

	const handleChange = (event) => {
		setSelectedPerson(event.target.value);
	};

	const handleClose = () => {
		onClose(selectedValue);
	};

	const { isLoading, data: usersResponsible } = useQuery(
		["getUsersResponsible"],
		() => getUsersResponsible()
	);

	const putUserMutation = useMutation(
		(mutationData) => {
			putUserResponsible(mutationData.idProcedure, mutationData.selectedPerson);
		},
		{
			onSuccess: () => {
				history.push(`/pending`);
				alert("Responsable asignado correctamente!");
			},
		}
	);

	if (isLoading) return <Loader />;

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
					onClick={() => {
						putUserMutation.mutate({ idProcedure, selectedPerson });
					}}
					autoFocus
					color='secondary'
					variant='contained'
					disabled={!selectedPerson || putUserMutation.isLoading}
				>
					Aprobar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AcceptanceDialog;
