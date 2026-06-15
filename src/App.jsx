import { useMemo, useState } from "react";
import { Box, Container } from "@mui/material";
import CabecalhoCatalogo from "./componentes/CabecalhoCatalogo";
import SecaoCatalogo from "./componentes/SecaoCatalogo";
import listaDeJogos from "./dados/listaDeJogos";

function filtrarJogosPorTitulo(textoBusca) {
  const termoBusca = textoBusca.trim().toLowerCase();

  return listaDeJogos.filter((dadosJogo) =>
    dadosJogo.titulo.toLowerCase().includes(termoBusca)
  );
}

function App() {
  const [textoBusca, setTextoBusca] = useState("");

  const jogosFiltrados = useMemo(
    () => filtrarJogosPorTitulo(textoBusca),
    [textoBusca]
  );

  return (
    <Box component="div" className="Aplicacao">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CabecalhoCatalogo
          textoBusca={textoBusca}
          aoAlterarBusca={setTextoBusca}
        />

        <Box component="main">
          <SecaoCatalogo jogosFiltrados={jogosFiltrados} />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
