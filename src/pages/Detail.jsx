import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuList,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const DetailPage = () => {
  const [isInProgress, setIsInProgress] = useState(false);
  let location = useLocation();
  const { code } = useParams();
  // GET detalle con el codigo de tramite
  console.log(code);

  useEffect(() => {
    setIsInProgress(location.pathname.startsWith("/in-progress"));
  }, [location]);

  console.log(isInProgress);
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
    </Box>
  );
};

export default DetailPage;
