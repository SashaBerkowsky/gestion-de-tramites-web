import React, { useState } from "react";
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import { useMutation } from "react-query";
import { finishProcedure } from "../api/procedures";
import { useHistory } from "react-router-dom";

export default function RejectionDialog({
	closeRejectDialog,
	isRejectDialogOpen,
	textButton,
	textMessageDialog,
	reason,
	idProcedure,
}) {
	const [textReject, setTextReject] = useState("");
	let history = useHistory();

	const putRejectionMutation = useMutation(
		(mutationData) => {
			console.log(mutationData.idProcedure);
			finishProcedure(mutationData.idProcedure, true, mutationData.textReject);
		},
		{
			onSuccess: () => {
				history.push(`/pending`);
				alert("Tramite rechazado correctamente");
			},
		}
	);

	const handleRejectPaperwork = () => {
		putRejectionMutation.mutate({ idProcedure, textReject });
		setTextReject("");
	};

	const handleCloseDialog = () => {
		setTextReject("");
		closeRejectDialog();
	};

	const handleChange = (event) => {
		setTextReject(event.target.value);
	};

	return (
		<Dialog
			fullWidth
			maxWidth='sm'
			open={isRejectDialogOpen}
			onClose={handleCloseDialog}
		>
			<DialogContent>
				<DialogContentText sx={{ fontWeight: "bold" }}>
					{textMessageDialog}
				</DialogContentText>
				<TextField
					sx={{ width: "100%", marginTop: 3 }}
					id='outlined-multiline-static'
					label={reason}
					multiline
					rows={6}
					value={textReject}
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
				<Button color='info' variant='contained' onClick={handleCloseDialog}>
					Cancel
				</Button>
				<Button
					color='error'
					variant='contained'
					onClick={handleRejectPaperwork}
					disabled={!textReject}
				>
					{textButton}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
