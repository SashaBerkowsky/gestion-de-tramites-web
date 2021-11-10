import React, { useEffect } from "react";
import { getTableRowsForPending } from "../utils/tables";
import { Box } from "@mui/material";
import PendingTable from "../components/PendingTable";
import CounterCard from "../components/CounterCard";
import { useQuery } from "react-query";
import { getPendingProcedures } from "../api/procedures";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { useAuth } from "../session";
import { useHistory } from "react-router";

const PendingPage = () => {
  const { currentUser } = useAuth();
  let history = useHistory();
  useEffect(() => {
    if (currentUser.userRole === "responsable") {
      history.push("/in-progress");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const {
    isLoading: isLoadingProcedures,
    data: pendingProcedures,
    isError,
    error,
  } = useQuery("getPendingProcedures", getPendingProcedures);

  if (isLoadingProcedures) return <Loader />;
  if (isError) return <ErrorAlert message={error.message} />;

  const headCells = [
    {
      id: "idProcedure",
      label: "Id",
    },
    {
      id: "code",
      label: "Código",
    },
    {
      id: "type",
      label: "Tipo",
    },
    {
      id: "userName",
      label: "Usuario",
    },
    {
      id: "dni",
      label: "DNI",
    },
    {
      id: "createdAt",
      label: "Fecha de inicio",
    },
  ];
  const rows = pendingProcedures
    ? getTableRowsForPending(pendingProcedures)
    : [];
  return (
    <Box>
      <Box mb={3}>
        <CounterCard
          title="Pendientes de analisis"
          counter={pendingProcedures.length}
        />
      </Box>
      {rows.length > 0 ? (
        <PendingTable headCells={headCells} rows={rows} />
      ) : (
        <Box>No se encontraron trámites pendientes</Box>
      )}
    </Box>
  );
};

export default PendingPage;
