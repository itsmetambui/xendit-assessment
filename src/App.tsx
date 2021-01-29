import React from "react";
import { Helmet } from "react-helmet";
import DateFnsUtils from "@date-io/date-fns";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "styled-components/macro";
import { create } from "jss";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";

import theme from "./theme";
import Routes from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { UniversityQueryProvider } from "./contexts/UniversityQueryContext";
import { FavoriteUniversitiesProvider } from "./contexts/FavoriteContext";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")!,
});

const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | Xendit" defaultTitle="Xendit" />
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <QueryClientProvider client={queryClient}>
                <SnackbarProvider maxSnack={3}>
                  <AuthProvider>
                    <Router>
                      <UniversityQueryProvider>
                        <FavoriteUniversitiesProvider>
                          <Routes />
                        </FavoriteUniversitiesProvider>
                      </UniversityQueryProvider>
                    </Router>
                  </AuthProvider>
                </SnackbarProvider>
              </QueryClientProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
