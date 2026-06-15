import { Box, Container } from "@mui/material";
import CabecalhoCatalogo from "./componentes/CabecalhoCatalogo";
import SecaoCatalogo from "./componentes/SecaoCatalogo";
import useCatalogoJogos from "./hooks/useCatalogoJogos";

function App() {
  const { textoBusca, setTextoBusca, jogos, carregando, mensagemErro } =
    useCatalogoJogos();

  return (
    <Box component="div" className="Aplicacao">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CabecalhoCatalogo
          textoBusca={textoBusca}
          aoAlterarBusca={setTextoBusca}
        />

        <Box component="main">
          <SecaoCatalogo
            jogos={jogos}
            textoBusca={textoBusca}
            carregando={carregando}
            mensagemErro={mensagemErro}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
