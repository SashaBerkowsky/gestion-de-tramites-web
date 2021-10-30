import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertDialog({ isopen, closeDialog, observations }) {
  const listItems = observations.map((obs, i) => (
    <li style={{ marginBottom: 30 }} key={i}>
      {obs.date} - {obs.state} - {obs.prof}
      {obs.turn ? " - Turno: " + obs.turn : ""}
      {obs.note ? " - Nota: " + obs.note : ""}
    </li>
  ));

  return (
    <div>
      <Dialog
        open={isopen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ paddingTop: 4 }} id="alert-dialog-title">
          {"Observaciones"}
        </DialogTitle>

        <IconButton
          aria-label="close"
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
          <DialogContentText id="alert-dialog-description">
            <ul>{listItems}</ul>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
