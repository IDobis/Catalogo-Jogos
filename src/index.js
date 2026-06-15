import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";

const temaEscuro = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6c5ce7",
    },
    secondary: {
      main: "#00cec9",
    },
    background: {
      default: "#0f0f14",
      paper: "#1a1a24",
    },
  },
});

const elementoRaiz = document.getElementById("raiz");

ReactDOM.createRoot(elementoRaiz).render(
  <React.StrictMode>
    <ThemeProvider theme={temaEscuro}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
