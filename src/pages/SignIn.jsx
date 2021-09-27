import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ ErrorText: "", error: false });
  const emailRegex = new RegExp(
    "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
      "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
  );

  const data = { email: "nico@gmail.com", pass: "Nico123" };

  const isFieldvalid = () =>
    !emailRegex.test(email) || email === "" || password === "";

  function handleSignIn() {
    if (email === data.email && data.pass === password) {
      console.log("logeo Existoso");
      setError({
        ...error,
        ErrorText: "",
        error: false,
      });
    } else {
      setError({
        ...error,
        ErrorText: "Email o contraseña invaldos",
        error: true,
      });
    }
  }
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
            INICIAR SESIÓN
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              type="email"
              sx={{ marginTop: 1.5 }}
              id="email"
              label="Email"
              variant="standard"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <TextField
              error={error.error}
              helperText={error.ErrorText}
              type="password"
              sx={{ marginTop: 1.5 }}
              id="pass"
              label="Contraseña"
              variant="standard"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{ marginTop: 5, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="secondary"
            disabled={isFieldvalid()}
            onClick={() => handleSignIn()}
          >
            Entrar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SignInPage;
