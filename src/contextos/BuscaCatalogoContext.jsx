import { createContext, useContext, useMemo, useState } from "react";

const BuscaCatalogoContext = createContext(null);

function BuscaCatalogoProvider({ children }) {
  const [textoBusca, setTextoBusca] = useState("");

  const valor = useMemo(
    () => ({
      textoBusca,
      setTextoBusca,
    }),
    [textoBusca]
  );

  return (
    <BuscaCatalogoContext.Provider value={valor}>
      {children}
    </BuscaCatalogoContext.Provider>
  );
}

function useBuscaCatalogo() {
  const contexto = useContext(BuscaCatalogoContext);

  if (!contexto) {
    throw new Error("useBuscaCatalogo deve ser usado dentro de BuscaCatalogoProvider");
  }

  return contexto;
}

export { BuscaCatalogoProvider, useBuscaCatalogo };
