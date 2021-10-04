import React, { useState } from "react";
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

function AcceptanceDialog({ onClose, selectedValue, open }) {
  const [selectedPerson, setSelectedPerson] = useState("");

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Seleccione al responsable de aprobación</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Responsable
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedPerson}
              onChange={handleChange}
              label="Evaluador"
            >
              <MenuItem value={0}>Sergio Gómez</MenuItem>
              <MenuItem value={1}>Catalina Perez</MenuItem>
            </Select>
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleClose} color="info" variant="contained">
          Cancelar
        </Button>
        <Button
          onClick={() => console.log("aprobar")}
          autoFocus
          color="secondary"
          variant="contained"
        >
          Aprobar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AcceptanceDialog;
