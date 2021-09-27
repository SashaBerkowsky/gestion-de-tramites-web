import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const PasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [errorCurrent, setErrorCurrent] = useState({
    errorCurrent: false,
    errorCurrentText: "",
  });
  const [errorPass, setErrorPass] = useState({
    newErrorPass: false,
    newErrorPassText: "",
  });
  const [errorPass2, setErrorPass2] = useState({
    newErrorPass2: false,
    newErrorPassText2: "",
  });

  const pass = "Nico123";

  const currentPassValid = () => {
    console.log(currentPassword);

    console.log(pass);
    if (currentPassword !== pass) {
      console.log("entra");
      setErrorCurrent({
        errorCurrent: true,
        errorCurrentText: "La contraseña no coincide con la actual",
      });
    } else {
      setErrorCurrent({
        errorCurrent: false,
        errorCurrentText: "",
      });
    }
  };

  const isEmpty = () =>
    currentPassword === "" || newPassword === "" || newPassword2 === "";

  const validNewPass = () => {
    if (
      !(
        newPassword.match(/[A-Z]/) &&
        newPassword.match(/[0-9]/) &&
        newPassword !== currentPassword
      )
    ) {
      setErrorPass({
        newErrorPassText:
          "La nueva contraseña tiene que contener una mayuscula, una minuscula ",
        newErrorPass: true,
      });
    } else {
      setErrorPass({
        newErrorPassText: "",
        newErrorPass: false,
      });
    }
  };
  function samePasswords() {
    if (!(newPassword === newPassword2 && newPassword !== currentPassword)) {
      setErrorPass2({
        newErrorPass2: true,
        newErrorPassText2: "Las contraseñas no son iguales ",
      });
    } else {
      setErrorPass2({
        newErrorPass2: false,
        newErrorPassText2: "",
      });
    }
  }
  const handleChangePass = () => {
    currentPassValid();
    validNewPass();
    samePasswords();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ padding: 1, minWidth: 310, boxShadow: 5 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="primary" variant="h6">
            CAMBIAR CONTRASEÑA
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              error={errorCurrent.errorCurrent}
              helperText={errorCurrent.errorCurrentText}
              type="password"
              sx={{ marginTop: 1.5 }}
              id="currentPass"
              label="Contraseña actual"
              variant="standard"
              value={currentPassword}
              onChange={({ target }) => setCurrentPassword(target.value)}
            />
            <TextField
              type="password"
              sx={{ marginTop: 1.5 }}
              id="newPass"
              label="Nueva contraseña"
              variant="standard"
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
              error={errorPass.newErrorPass}
              helperText={errorPass.newErrorPassText}
            />
            <TextField
              type="password"
              sx={{ marginTop: 1.5 }}
              id="repeatNewPass"
              label="Confirmar contraseña"
              variant="standard"
              value={newPassword2}
              onChange={({ target }) => setNewPassword2(target.value)}
              error={errorPass2.newErrorPass2}
              helperText={errorPass2.newErrorPassText2}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="secondary"
            disabled={isEmpty()}
            onClick={() => {
              handleChangePass();
            }}
          >
            Entrar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PasswordPage;
