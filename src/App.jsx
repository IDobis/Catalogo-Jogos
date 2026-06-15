import { Box } from "@mui/material";
import { Route, Routes, useParams } from "react-router-dom";
import BarraNavegacao from "./componentes/BarraNavegacao";
import { ArmazenamentoPessoalProvider } from "./contextos/ArmazenamentoPessoalContext";
import PaginaCatalogo from "./paginas/PaginaCatalogo";
import PaginaDetalheJogo from "./paginas/PaginaDetalheJogo";
import PaginaFavoritos from "./paginas/PaginaFavoritos";
import PaginaMinhaLista from "./paginas/PaginaMinhaLista";

function RotaDetalheJogo() {
  const { id } = useParams();
  const identificador = Number.parseInt(id, 10);

  return <PaginaDetalheJogo identificador={identificador} />;
}

function App() {
  return (
    <ArmazenamentoPessoalProvider>
      <Box component="div" className="Aplicacao">
        <BarraNavegacao />
        <Routes>
          <Route path="/" element={<PaginaCatalogo />} />
          <Route path="/favoritos" element={<PaginaFavoritos />} />
          <Route path="/minha-lista" element={<PaginaMinhaLista />} />
          <Route path="/jogo/:id" element={<RotaDetalheJogo />} />
        </Routes>
      </Box>
    </ArmazenamentoPessoalProvider>
  );
}

export default App;
