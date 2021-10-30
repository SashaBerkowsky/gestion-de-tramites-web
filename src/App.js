import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import DashboardPage from "./pages/Dashboard";
import SignInPage from "./pages/SignIn";
import PasswordPage from "./pages/Password";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import InProgressPage from "./pages/InProgress";
import DetailPage from "./pages/Detail";
import PendingPage from "./pages/Pending";
import HistoricalPage from "./pages/Historical";
import { AuthProvider } from "./session";

import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
                  <PrivateRoute
                    exact
                    path="/password"
                    component={PasswordPage}
                  />
                  <PrivateRoute
                    exact
                    path="/in-progress"
                    component={InProgressPage}
                  />
                  <PrivateRoute exact path="/pending" component={PendingPage} />
                  <PrivateRoute
                    exact
                    path="/in-progress/:code"
                    component={DetailPage}
                  />
                  <PrivateRoute
                    exact
                    path="/detail/:code"
                    component={DetailPage}
                  />
                  <PrivateRoute path="/historical" component={HistoricalPage} />
                  <PrivateRoute exact path="/" component={DashboardPage} />
                </Switch>
              </div>
            </NavDrawer>
          </ThemeProvider>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
