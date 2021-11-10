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
import { getListOfHistoricalProcedures } from "../api/procedures";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { uniqBy } from "lodash";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const HistoricalPage = () => {
  const [rows, setRows] = useState([]);
  const [rowTotal, setRowTotal] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    state: "",
    createdAt: new Date(),
  });

  const { isFetching: isLoadingProcedures, refetch } = useQuery(
    "getListOfHistoricalProcedures",
    getListOfHistoricalProcedures,
    {
      onSuccess: (historicalProcedures) => {
        const tableRows = getTableRowsForHistorical(historicalProcedures);
        setRows(tableRows);
        setRowTotal(tableRows.length);
      },
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleApplyFilters = () => {
    console.log(filters);
    let newRows;
    if (filters.createdAt) {
      const sartDate = new Date(filters.createdAt).getTime();

      newRows = rows.filter((d) => {
        var createdAt = new Date(d.createdAt).getTime();
        return createdAt > sartDate;
      });
    }

    if (filters.type) {
      newRows = newRows.filter((d) => {
        return d.type === filters.type;
      });
    }
    if (filters.state) {
      newRows = newRows.filter((d) => {
        return d.state === filters.state;
      });
    }
    setRows(newRows);
  };

  console.log(rows);

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
      label: "Inicio",
    },
    {
      id: "finishedAt",
      label: "Finalización",
    },
    {
      id: "evaluator",
      label: "Evaluador",
    },
    {
      id: "evaluatorRole",
      label: "Rol Evaluador",
    },
    {
      id: "state",
      label: "Estado",
    },
  ];

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
          <CounterCard title="Historicos totales" counter={rowTotal} fullSize />
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            label="Buscar"
            id="outlined-size-small"
            placeholder="Codigo / Usuario / DNI / Evaluador"
            size="small"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
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
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  label="Tipo de trámite"
                >
                  {uniqBy(rows, "type").map((r) => (
                    <MenuItem value={r.type} key={r.type}>
                      {r.type}
                    </MenuItem>
                  ))}
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
                  value={filters.state}
                  onChange={(e) =>
                    setFilters({ ...filters, state: e.target.value })
                  }
                  label="Estado del trámite"
                >
                  {uniqBy(rows, "state").map((r) => (
                    <MenuItem value={r.state} key={r.state}>
                      {r.state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Fecha de inicio"
                  inputFormat="MM/dd/yyyy"
                  value={filters.createdAt}
                  onChange={(newValue) =>
                    setFilters({ ...filters, createdAt: newValue })
                  }
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleApplyFilters}
              >
                APLICAR
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => refetch()}
              >
                RESET
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box mt={3}>
        {isLoadingProcedures ? (
          <Loader />
        ) : (
          <HistoricalTable
            headCells={headCells}
            rows={rows.filter(
              (procedure) =>
                procedure.code.toLowerCase().includes(searchQuery) ||
                procedure.userName.toLowerCase().includes(searchQuery) ||
                procedure.evaluator.toLowerCase().includes(searchQuery) ||
                procedure.dni.toLowerCase().includes(searchQuery)
            )}
          />
        )}
      </Box>
    </Box>
  );
};

export default HistoricalPage;
