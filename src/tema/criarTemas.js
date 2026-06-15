import { createTheme } from "@mui/material";
import { COR_PRIMARIA } from "../constantes/tema";

const opcoesComuns = {
  palette: {
    primary: {
      main: COR_PRIMARIA,
      light: "#8b7cf0",
      dark: "#5a4bd1",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00cec9",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

function criarTemaEscuro() {
  return createTheme({
    ...opcoesComuns,
    palette: {
      ...opcoesComuns.palette,
      mode: "dark",
      background: {
        default: "#0f0f14",
        paper: "#1a1a24",
      },
      text: {
        primary: "#f5f5f7",
        secondary: "#a0a0b0",
      },
    },
  });
}

function criarTemaClaro() {
  return createTheme({
    ...opcoesComuns,
    palette: {
      ...opcoesComuns.palette,
      mode: "light",
      background: {
        default: "#f4f2fa",
        paper: "#ffffff",
      },
      text: {
        primary: "#1a1528",
        secondary: "#5c5470",
      },
    },
  });
}

export { criarTemaClaro, criarTemaEscuro };
