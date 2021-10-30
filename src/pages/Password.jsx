import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAuth } from "../session";
import Loader from "../components/Loader";

const PasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ errorText: "", error: false });
  const emailRegex = new RegExp(
    "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
      "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
  );
  const { currentUser, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const isFieldvalid = email === "";

  const handleResetPassword = async () => {
    if (!emailRegex.test(email)) {
      setEmailError({
        errorText: "Formato de email incorrecto",
        error: true,
      });
    } else if (
      email !== currentUser.email &&
      email !== "gestiondetramitesort@gmail.com"
    ) {
      setEmailError({
        errorText: "Este email no posee la autorización necesaria",
        error: true,
      });
    } else {
      try {
        setEmailError({ errorText: "", error: false });
        setLoading(true);
        await resetPassword(email);
        setEmail("");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };

  if (loading) return <Loader />;

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
          <Typography sx={{ fontSize: 12 }} variant="h6">
            Le enviaremos un correo para cambiar su contraseña
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              type="text"
              sx={{ marginTop: 1.5 }}
              id="passwordEmail"
              label="Ingrese su email"
              variant="standard"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              error={emailError.error}
              helperText={emailError.errorText}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="secondary"
            disabled={isFieldvalid}
            onClick={handleResetPassword}
          >
            Enviar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PasswordPage;
