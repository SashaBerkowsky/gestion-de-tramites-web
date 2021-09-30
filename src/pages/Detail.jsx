import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const DetailPage = () => {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [textReject, setTextReject] = useState("");
  let location = useLocation();
  const { code } = useParams();
  // GET detalle con el codigo de tramite

  function openRejectDialog() {
    setIsRejectDialogOpen(true);
  }

  function closeRejectDialog() {
    setTextReject("");
    setIsRejectDialogOpen(false);
  }

  function rejectPaperwork() {
    //mandar el mensaje rechazo

    closeRejectDialog();
  }

  useEffect(() => {
    setIsInProgress(location.pathname.startsWith("/in-progress"));
  }, [location]);

  return (
    <Box>
      <Box>
        <Typography variant="h6" color="text.greenApp">
          lic_conducir-0001
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box as="p" color="text.primary" mr={2}>
          <Box as="span" sx={{ fontWeight: "bold" }}>
            Usuario:
          </Box>
          Test Uno
        </Box>
        <Box as="p" color="text.primary" mr={2}>
          <Box as="span" sx={{ fontWeight: "bold" }}>
            DNI:
          </Box>
          12345678
        </Box>
        <Box as="p" color="text.primary" mr={2}>
          <Box as="span" sx={{ fontWeight: "bold" }}>
            Fecha inicio:
          </Box>
          01/01/2021
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Button variant="contained" color="secondary">
            Volver atras
          </Button>
        </Box>
        <Box>
          {isInProgress && (
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "5px" }}
            >
              Aprobar
            </Button>
          )}
          {isInProgress && (
            <Button
              onClick={openRejectDialog}
              variant="contained"
              color="error"
              sx={{ marginRight: "5px" }}
            >
              Rechazar
            </Button>
          )}
          <Button variant="contained" color="info">
            Ver historial del trámite
          </Button>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "10px" }} />

      <Dialog
        fullWidth
        maxWidth="sm"
        open={isRejectDialogOpen}
        onClose={closeRejectDialog}
      >
        <DialogContent>
          <DialogContentText sx={{ fontWeight: "bold" }}>
            Indique los motivos por los cuales el tramite ha sido rechazado
          </DialogContentText>
          <TextField
            sx={{ width: "100%", marginTop: 3 }}
            id="outlined-multiline-static"
            label="razon de rechazo"
            multiline
            rows={6}
            value={textReject}
            onChange={({ target }) => setTextReject(target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ paddingRight: 2, paddingBottom: 2 }}>
          <Button color="info" variant="contained" onClick={closeRejectDialog}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={rejectPaperwork}>
            Rechazar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetailPage;
