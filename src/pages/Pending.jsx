import React, { useEffect } from "react";
import { getTableRowsForPending } from "../utils/tables";
import { Box } from "@mui/material";
import PendingTable from "../components/PendingTable";
import CounterCard from "../components/CounterCard";
import { useQuery } from "react-query";
import { getPendingProcedures } from "../api/procedures";
import Loader from "../components/Loader";
import { useAuth } from "../session";
import { useHistory } from "react-router";

const PendingPage = () => {
  const { currentUser } = useAuth();
  let history = useHistory();
  useEffect(() => {
    if (currentUser.userRole === "responsable") {
      history.push("/");
    }
  }, [currentUser]);

  const { isLoading: isLoadingProcedures, data: pendingProcedures } = useQuery(
    "getPendingProcedures",
    getPendingProcedures
  );

  if (isLoadingProcedures) return <Loader />;

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
  const rows = getTableRowsForPending(pendingProcedures);
  return (
    <Box>
      <Box mb={3}>
        <CounterCard
          title="Pendientes de analisis"
          counter={pendingProcedures.length}
        />
      </Box>
      <PendingTable headCells={headCells} rows={rows} />
    </Box>
  );
};

export default PendingPage;
