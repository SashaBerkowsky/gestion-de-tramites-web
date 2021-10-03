import React from "react";
import { getTableRowsForPending } from "../utils/tables";
import { Box } from "@mui/material";
import PendingTable from "../components/PendingTable";
import CounterCard from "../components/CounterCard";

const PendingPage = () => {
  const headCells = [
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
  const rows = getTableRowsForPending();
  return (
    <Box>
      <Box mb={3}>
        <CounterCard title="Pendientes de analisis" counter="10" />
      </Box>
      <PendingTable headCells={headCells} rows={rows} />;
    </Box>
  );
};

export default PendingPage;
