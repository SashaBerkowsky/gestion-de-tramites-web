import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { Box, Divider, Typography, Button } from "@mui/material";
import AcceptanceDialog from "../components/AcceptanceDialog";
import DetailData from "../components/DetailData";
import RejectionDialog from "../components/RejectionDialog";
import ObservationDialog from "../components/ObservationDialog";
import { useAuth } from "../session";
import { useQuery } from "react-query";
import { getProcedureDetail } from "../api/procedures";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import PopUpMsg from "../components/PopUpMsg";

const DetailPage = () => {
  let location = useLocation();
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { currentUser } = useAuth();
  const { idProcedure } = useParams();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [acceptanceModalOpen, setOpenAcceptanceModal] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isOpenObservationDialog, setIsOpenObservationDialog] = useState(false);
  const [observations, setObservations] = useState([]);
  let history = useHistory();

  const {
    isLoading: isLoadingProcedureDetail,
    data: procedureDetail,
    isError,
    error,
  } = useQuery(["getProcedureDetial", idProcedure], () =>
    getProcedureDetail(idProcedure)
  );

  useEffect(() => {
    setIsInProgress(location.pathname.startsWith("/in-progress"));
  }, [location]);

  useEffect(() => {
    console.log(procedureDetail);
  }, [procedureDetail]);

  if (isLoadingProcedureDetail) return <Loader />;

  if (isError) return <ErrorAlert message={error.message} />;

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
  const handleClose = (showSuccessAlert, successMsg) => {
    setOpenAcceptanceModal(false);
    setIsSuccessAlertOpen(showSuccessAlert);
    setSuccessMsg(successMsg);
  };

  const handleSuccess = () => {
    setIsSuccessAlertOpen(true);
  };

  // GET detalle con el codigo de tramite
  const openRejectDialog = () => {
    setIsRejectDialogOpen(true);
  };

  const closeRejectDialog = (showSuccessAlert, successMsg) => {
    setIsRejectDialogOpen(false);
    setIsSuccessAlertOpen(showSuccessAlert);
    setSuccessMsg(successMsg);
  };

  const openCloseDialog = () => {
    setIsCloseDialogOpen(true);
  };

  const closeDialog = (showSuccessAlert, successMsg) => {
    setIsCloseDialogOpen(false);
    setIsSuccessAlertOpen(showSuccessAlert);
    setSuccessMsg(successMsg);
  };

  return (
    <Box>
      <Box>
        <Typography variant="h6" color="text.greenApp">
          {`${procedureDetail.procedureTypeDescription
            .toLocaleLowerCase()
            .split(" ")
            .join("_")}-${procedureDetail.id}`}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.goBack()}
          >
            Volver atras
          </Button>
        </Box>
        <Box>
          {isInProgress && (
            <>
              {currentUser.userRole === "analista" && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: "5px" }}
                  onClick={handleClickOpen}
                >
                  Aprobar
                </Button>
              )}
              {currentUser.userRole === "responsable" && (
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
          {isInProgress && currentUser.userRole === "analista" && (
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
      <AcceptanceDialog
        open={acceptanceModalOpen}
        onClose={handleClose}
        handleSuccess={handleSuccess}
        idProcedure={procedureDetail.id}
      />
      <RejectionDialog
        idProcedure={procedureDetail.id}
        closeRejectDialog={closeRejectDialog}
        isRejectDialogOpen={isRejectDialogOpen}
        textMessageDialog="Indique los motivos por los cuales el tramite ha sido rechazado"
        textButton="Rechazar"
        reason="Razón de rechazo"
      />
      <RejectionDialog
        idProcedure={procedureDetail.id}
        closeRejectDialog={closeDialog}
        isRejectDialogOpen={isCloseDialogOpen}
        textMessageDialog="Indique los motivos por los cuales desea cerrar el trámite"
        textButton="Cerrar"
        reason="Razón del Cierre"
      />

      <ObservationDialog
        isopen={isOpenObservationDialog}
        closeDialog={handleCloseObservationDialog}
        observations={observaciones}
      />
      <PopUpMsg
        variety="success"
        isOpen={isSuccessAlertOpen}
        to="/pending"
        message={successMsg}
      />
    </Box>
  );
};

export default DetailPage;
