import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SessionContext } from "../session";
import { Box, Divider, Typography, Button } from "@mui/material";
import AcceptanceDialog from "../components/AcceptanceDialog";
import DetailData from "../components/DetailData";
import RejectionDialog from "../components/RejectionDialog";
import ObservationDialog from "../components/ObservationDialog";

const DetailPage = () => {
  let location = useLocation();
  const session = useContext(SessionContext);
  const { code } = useParams();
  console.log(code);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [acceptanceModalOpen, setOpenAcceptanceModal] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isOpenObservationDialog, setIsOpenObservationDialog] = useState(false);

  const observaciones = [
    {
      date: "01/01/2021 08:30hs",
      state: "En proceso de análisis",
      prof: "Ana Palermo",
    },
    {
      date: "02/01/2021 15:00hs",
      state: "Análisis aprobado",
      prof: "Ana Palermo",
    },
    {
      date: "04/01/2021 11:20hs",
      state: "Asignación turno trámite personal",
      prof: "Sergio Gomez",
      turn: "05/01/2021 10:00hs",
    },
    {
      date: "04/01/2021 13:14hs",
      state: "Caso cerrado",
      prof: "Sergio Gomez",
      note: " Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];

  const handleOpenObservationDialog = () => {
    setIsOpenObservationDialog(true);
  };
  const handleCloseObservationDialog = () => {
    setIsOpenObservationDialog(false);
  };

  const handleClickOpen = () => {
    setOpenAcceptanceModal(true);
  };
  const handleClose = () => {
    setOpenAcceptanceModal(false);
  };

  // GET detalle con el codigo de tramite
  const openRejectDialog = () => {
    setIsRejectDialogOpen(true);
  };

  const closeRejectDialog = () => {
    setIsRejectDialogOpen(false);
  };

  const openCloseDialog = () => {
    setIsCloseDialogOpen(true);
  };

  const closeDialog = () => {
    setIsCloseDialogOpen(false);
  };

  const rejectPaperwork = (message) => {
    // TODO mandar el mensaje rechazo
    closeRejectDialog();
  };

  const closePaperwork = (message) => {
    //TODO mandar el mensaje cerrar tramite
    console.log(message);
    closeDialog();
  };

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
            <>
              {session.role === "analista" && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: "5px" }}
                  onClick={handleClickOpen}
                >
                  Aprobar
                </Button>
              )}
              {session.role === "responsable" && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginRight: "5px" }}
                  onClick={openCloseDialog}
                >
                  Cerrar tramite
                </Button>
              )}
            </>
          )}
          {isInProgress && session.role === "analista" && (
            <Button
              onClick={openRejectDialog}
              variant="contained"
              color="error"
              sx={{ marginRight: "5px" }}
            >
              Rechazar
            </Button>
          )}
          <Button
            onClick={handleOpenObservationDialog}
            variant="contained"
            color="info"
          >
            Ver historial del trámite
          </Button>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "10px" }} />
      <DetailData />
      <AcceptanceDialog open={acceptanceModalOpen} onClose={handleClose} />
      <RejectionDialog
        closeRejectDialog={closeRejectDialog}
        rejectPaperwork={rejectPaperwork}
        isRejectDialogOpen={isRejectDialogOpen}
        textMessageDialog="Indique los motivos por los cuales el tramite ha sido rechazado"
        textButton="Rechazar"
        reason="razón de rechazo"
      />
      <RejectionDialog
        closeRejectDialog={closeDialog}
        rejectPaperwork={closePaperwork}
        isRejectDialogOpen={isCloseDialogOpen}
        textMessageDialog="Indique los motivos por los cuales desea cerrar el trámite"
        textButton="Cerrar"
        reason="razón del Cierre"
      />

      <ObservationDialog
        isopen={isOpenObservationDialog}
        closeDialog={handleCloseObservationDialog}
        observations={observaciones}
      />
    </Box>
  );
};

export default DetailPage;
