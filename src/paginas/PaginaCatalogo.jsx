import { Box, Container } from "@mui/material";
import CabecalhoCatalogo from "../componentes/CabecalhoCatalogo";
import PainelFiltrosCatalogo from "../componentes/PainelFiltrosCatalogo";
import SecaoCatalogo from "../componentes/SecaoCatalogo";
import useCatalogoJogos from "../hooks/useCatalogoJogos";

function PaginaCatalogo() {
  const {
    textoBusca,
    ordenacao,
    setOrdenacao,
    filtros,
    setFiltros,
    jogos,
    temMais,
    carregandoInicial,
    carregandoMais,
    mensagemErro,
    carregarMais,
    recarregar,
  } = useCatalogoJogos();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <CabecalhoCatalogo />

      <Box component="main">
        <PainelFiltrosCatalogo
          filtros={filtros}
          aoAlterarFiltros={setFiltros}
          carregandoInicial={carregandoInicial}
        />

        <SecaoCatalogo
          jogos={jogos}
          textoBusca={textoBusca}
          filtros={filtros}
          ordenacao={ordenacao}
          aoAlterarOrdenacao={setOrdenacao}
          carregandoInicial={carregandoInicial}
          carregandoMais={carregandoMais}
          temMais={temMais}
          mensagemErro={mensagemErro}
          aoCarregarMais={carregarMais}
          aoTentarNovamente={recarregar}
        />
      </Box>
    </Container>
  );
}

export default PaginaCatalogo;
