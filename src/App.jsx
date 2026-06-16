import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Route, Routes, useParams } from "react-router-dom";
import BarraNavegacao from "./componentes/BarraNavegacao";
import { ArmazenamentoPessoalProvider } from "./contextos/ArmazenamentoPessoalContext";
import { BuscaCatalogoProvider } from "./contextos/BuscaCatalogoContext";
import PaginaCatalogo from "./paginas/PaginaCatalogo";

const PaginaDetalheJogo = lazy(() => import("./paginas/PaginaDetalheJogo"));
const PaginaFavoritos = lazy(() => import("./paginas/PaginaFavoritos"));
const PaginaMinhaLista = lazy(() => import("./paginas/PaginaMinhaLista"));

function CarregandoRota() {
  return (
    <Box display="flex" justifyContent="center" py={8}>
      <CircularProgress aria-label="Carregando página" />
    </Box>
  );
}

function RotaDetalheJogo() {
  const { id } = useParams();
  const identificador = Number.parseInt(id, 10);

  return <PaginaDetalheJogo identificador={identificador} />;
}

function App() {
  return (
    <BuscaCatalogoProvider>
      <ArmazenamentoPessoalProvider>
        <Box component="div" className="Aplicacao">
          <BarraNavegacao />
          <Routes>
            <Route path="/" element={<PaginaCatalogo />} />
            <Route
              path="/favoritos"
              element={
                <Suspense fallback={<CarregandoRota />}>
                  <PaginaFavoritos />
                </Suspense>
              }
            />
            <Route
              path="/minha-lista"
              element={
                <Suspense fallback={<CarregandoRota />}>
                  <PaginaMinhaLista />
                </Suspense>
              }
            />
            <Route
              path="/jogo/:id"
              element={
                <Suspense fallback={<CarregandoRota />}>
                  <RotaDetalheJogo />
                </Suspense>
              }
            />
          </Routes>
        </Box>
      </ArmazenamentoPessoalProvider>
    </BuscaCatalogoProvider>
  );
}

export default App;
