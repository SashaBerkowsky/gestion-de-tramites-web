import React, { useState } from "react";
import { getTableRowsForInProgress } from "../utils/tables";
import InProgressTable from "../components/InProgressTable";
import CounterCard from "../components/CounterCard";
import {
  Grid,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const InProgressPage = () => {
  const [selectedPerson, setSelectedPerson] = useState("");

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const rol = "Analista";
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
    {
      id: "designatedTo",
      label: rol,
    },
  ];
  const rows = getTableRowsForInProgress();
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        mb={3}
      >
        <Grid item xs={2} sm={4} md={4}>
          <CounterCard title="En proceso de analisis" counter="10" />
        </Grid>
        <Grid item xs={2} sm={4} md={4}></Grid>
        <Grid item xs={2} sm={4} md={4}>
          <FormControl variant="standard" sx={{ m: 1, width: "98%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              {rol}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedPerson}
              onChange={handleChange}
              label="Evaluador"
            >
              <MenuItem value={0}>Ana Palermo</MenuItem>
              <MenuItem value={1}>Fernando Belle</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <InProgressTable headCells={headCells} rows={rows} />;
    </Box>
  );
};

export default InProgressPage;
