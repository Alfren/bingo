import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: cyan[500] },
    white: { main: "#fff" },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
