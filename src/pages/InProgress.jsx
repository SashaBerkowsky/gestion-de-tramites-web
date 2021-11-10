import React, { useState, useEffect } from "react";
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
import { useAuth } from "../session";
import { getProceduresInProgress } from "../api/procedures";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { uniqBy } from "lodash";

const InProgressPage = () => {
  const { currentUser } = useAuth();
  const sessionData = currentUser.userRole;
  const [selectedPerson, setSelectedPerson] = useState("");

  const handleChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const { isLoading: isLoadingProcedures, data: inProgressProcedures } =
    useQuery(["getProceduresInProgress"], () =>
      getProceduresInProgress(currentUser.userRole)
    );

  useEffect(() => {
    if (currentUser) {
      setSelectedPerson(currentUser.completeName);
    }
  }, [currentUser]);

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
    {
      id: "designatedTo",
      label: sessionData,
    },
  ];
  const rows = inProgressProcedures
    ? getTableRowsForInProgress(inProgressProcedures)
    : [];

  const designatedList = uniqBy(rows, "designatedTo");
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
          <CounterCard
            title="En proceso de analisis"
            counter={inProgressProcedures.length}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}></Grid>
        <Grid item xs={2} sm={4} md={4}>
          <FormControl variant="standard" sx={{ m: 1, width: "98%" }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ textTransform: "capitalize" }}
            >
              {sessionData}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedPerson}
              onChange={handleChange}
              label="Evaluador"
            >
              {designatedList.map((r) => (
                <MenuItem value={r.designatedTo} key={r.designatedTo}>
                  {r.designatedTo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <InProgressTable
        headCells={headCells}
        rows={rows.filter(
          (procedure) => procedure.designatedTo === selectedPerson
        )}
      />
    </Box>
  );
};

export default InProgressPage;
