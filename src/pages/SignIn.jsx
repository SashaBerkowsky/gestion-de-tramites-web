import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAuth } from "../session";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";

const SignInPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState({ errorText: "", error: false });
	const [passError, setPassError] = useState({ errorText: "", error: false });
	const emailRegex = new RegExp(
		"^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
			"[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
	);
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const isFieldvalid = email === "" || password === "";

	const handleSignIn = async () => {
		if (emailRegex.test(email)) {
			try {
				setEmailError({ errorText: "", error: false });
				setPassError({ errorText: "", error: false });
				setLoading(true);
				await login(email, password);
				setTimeout(() => {
					setLoading(false);
					// TODO: Se ve que history renderiza despues que la app entonces no llega a pushear, por eso el setTimeout
					// https://stackoverflow.com/questions/50925939/react-history-push-not-rendering-new-component
					history.push("/");
				}, 1500);
			} catch (err) {
				setLoading(false);
				console.log(err);
				setPassError({
					errorText: "Usuario o contraseña incorrectos",
					error: true,
				});
				setEmailError({
					errorText: "",
					error: true,
				});
			}
		} else {
			setEmailError({
				errorText: "Formato de email incorrecto",
				error: true,
			});
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
					<Typography sx={{ fontSize: 14 }} color='primary' variant='h6'>
						INICIAR SESIÓN
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<TextField
							error={emailError.error}
							helperText={emailError.errorText}
							type='email'
							sx={{ marginTop: 1.5 }}
							id='email'
							label='Email'
							variant='standard'
							value={email}
							required
							onChange={({ target }) => setEmail(target.value)}
						/>
						<TextField
							error={passError.error}
							helperText={passError.errorText}
							type='password'
							sx={{ marginTop: 1.5 }}
							id='pass'
							label='Contraseña'
							variant='standard'
							value={password}
							required
							onChange={({ target }) => setPassword(target.value)}
						/>
					</Box>
				</CardContent>
				<CardActions
					sx={{ marginTop: 5, display: "flex", justifyContent: "flex-end" }}
				>
					<Button
						variant='contained'
						color='secondary'
						disabled={isFieldvalid}
						onClick={handleSignIn}
					>
						Entrar
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default SignInPage;
