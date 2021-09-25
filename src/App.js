import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Perfil";
import SignInPage from "./pages/SignIn";
import PasswordPage from "./pages/Password";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#009688",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#3D5AFE",
    },
    info: {
      main: "#D5D5D5",
    },
    error: {
      main: "#D60909",
    },
  },
});

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NavDrawer>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/sign-in">
                <SignInPage />
              </Route>
              <Route path="/password">
                <PasswordPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/">
                <DashboardPage />
              </Route>
            </Switch>
          </div>
        </NavDrawer>
      </ThemeProvider>
    </Router>
  );
}
