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

export default function RejectionDialog({
  closeRejectDialog,
  isRejectDialogOpen,
  textButton,
  textMessageDialog,
  reason,
  idProcedure,
}) {
  const [textReject, setTextReject] = useState("");

  const putRejectionMutation = useMutation((mutationData) => {
    console.log(mutationData.idProcedure);
    finishProcedure(mutationData.idProcedure, true, mutationData.textReject);
  });

  const handleRejectPaperwork = async () => {
    await putRejectionMutation.mutateAsync({ idProcedure, textReject });
    closeRejectDialog(true, "Razon de finalización asignada correctamente!");
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
      maxWidth="sm"
      open={isRejectDialogOpen}
      onClose={handleCloseDialog}
    >
      <DialogContent>
        <DialogContentText sx={{ fontWeight: "bold" }}>
          {textMessageDialog}
        </DialogContentText>
        <TextField
          sx={{ width: "100%", marginTop: 3 }}
          id="outlined-multiline-static"
          label={reason}
          multiline
          rows={6}
          value={textReject}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
        <Button color="info" variant="contained" onClick={handleCloseDialog}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleRejectPaperwork}
          disabled={!textReject}
        >
          {textButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
