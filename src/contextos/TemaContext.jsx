import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CHAVE_PREFERENCIA_TEMA } from "../constantes/tema";
import { criarTemaClaro, criarTemaEscuro } from "../tema/criarTemas";

const TemaContext = createContext(null);

function lerPreferenciaTema() {
  try {
    const valor = localStorage.getItem(CHAVE_PREFERENCIA_TEMA);
    return valor === "claro" ? "claro" : "escuro";
  } catch {
    return "escuro";
  }
}

function TemaProvider({ children }) {
  const [modo, definirModo] = useState(lerPreferenciaTema);

  const alternarModo = useCallback(() => {
    definirModo((modoAtual) => {
      const proximoModo = modoAtual === "escuro" ? "claro" : "escuro";
      localStorage.setItem(CHAVE_PREFERENCIA_TEMA, proximoModo);
      return proximoModo;
    });
  }, []);

  const tema = useMemo(
    () => (modo === "claro" ? criarTemaClaro() : criarTemaEscuro()),
    [modo]
  );

  const valor = useMemo(
    () => ({
      modo,
      alternarModo,
      ehModoClaro: modo === "claro",
    }),
    [modo, alternarModo]
  );

  return (
    <TemaContext.Provider value={valor}>
      <ThemeProvider theme={tema}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </TemaContext.Provider>
  );
}

function useTema() {
  const contexto = useContext(TemaContext);

  if (!contexto) {
    throw new Error("useTema deve ser usado dentro de TemaProvider");
  }

  return contexto;
}

export { TemaProvider, useTema };
