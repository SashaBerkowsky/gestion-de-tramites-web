import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Perfil";
import SignInPage from "./pages/SignIn";
import PasswordPage from "./pages/Password";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import InProgressPage from "./pages/InProgress";
import DetailPage from "./pages/Detail";
import PendingPage from "./pages/Pending";
import HistoricalPage from "./pages/Historical";
import { SessionContext, getSession } from "./session";

const theme = createTheme({
  palette: {
    text: {
      primary: "#404040",
      secondary: "#666666",
      greenApp: "#009688",
    },
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
  const [session, setSession] = useState(getSession());
  useEffect(() => {
    setSession(getSession());
  }, [session]);
  return (
    <SessionContext.Provider value={session}>
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
                <Route exact path="/in-progress">
                  <InProgressPage />
                </Route>
                <Route path="/in-progress/:code">
                  <DetailPage />
                </Route>
                <Route path="/detail/:code">
                  <DetailPage />
                </Route>
                <Route path="/pending">
                  <PendingPage />
                </Route>
                <Route path="/historical">
                  <HistoricalPage />
                </Route>
                <Route path="/">
                  <DashboardPage />
                </Route>
              </Switch>
            </div>
          </NavDrawer>
        </ThemeProvider>
      </Router>
    </SessionContext.Provider>
  );
}
