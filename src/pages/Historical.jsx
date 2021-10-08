import React, { useState } from "react";
import { getTableRowsForHistorical } from "../utils/tables";
import CounterCard from "../components/CounterCard";
import {
  Grid,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  InputAdornment,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoricalTable from "../components/HistoricalTable";
import RangePickerDate from "../components/RangePickerDate";

const HistoricalPage = () => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [expanded, setExpanded] = React.useState(true);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

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
      label: "Inicio",
    },
    {
      id: "finishedAt",
      label: "Finalización",
    },
    {
      id: "analyst",
      label: "Analista",
    },
    {
      id: "evaluator",
      label: "Responsable",
    },
    {
      id: "state",
      label: "Estado",
    },
  ];

  const rows = getTableRowsForHistorical();
  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        mb={3}
      >
        <Grid item md={4}>
          <CounterCard title="Historicos totales" counter="1005" size={12} />
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            label="Buscar"
            id="outlined-size-small"
            placeholder="Codigo / Usuario / DNI / Analista / Evaluador"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Accordion expanded={expanded} onChange={handleExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ paddingTop: "10px" }}>
              <FormControl size="small" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Tipo de trámite
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedPerson}
                  onChange={handleChange}
                  label="Tipo de trámite"
                >
                  <MenuItem value={0}>Licencia de conducir</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} sx={{ paddingTop: "10px" }}>
              <FormControl size="small" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Estado del trámite
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedPerson}
                  onChange={handleChange}
                  label="Estado del trámite"
                >
                  <MenuItem value={0}>Aprobado</MenuItem>
                  <MenuItem value={1}>Rechazado</MenuItem>
                  <MenuItem value={1}>Cerrado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <RangePickerDate />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="secondary" fullWidth>
                APLICAR FILTROS
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box mt={3}>
        <HistoricalTable headCells={headCells} rows={rows} />;
      </Box>
    </Box>
  );
};

export default HistoricalPage;
