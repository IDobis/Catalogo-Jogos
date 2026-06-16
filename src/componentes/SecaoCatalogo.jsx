import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import BotaoPadraoPulante from "./BotaoPadraoPulante";
import BarraControlesCatalogo from "./BarraControlesCatalogo";
import CartaoJogo from "./CartaoJogo";
import CartaoJogoSkeleton from "./CartaoJogoSkeleton";
import { temFiltrosAtivos } from "../constantes/filtrosCatalogo";
import {
  ESTILO_GRADE_CATALOGO,
  QUANTIDADE_SKELETONS,
} from "../constantes/layoutCatalogo";

function EstadoVazioCatalogo({ mensagem }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 6,
        px: 3,
        textAlign: "center",
        borderStyle: "dashed",
        bgcolor: "background.default",
      }}
    >
      <Typography component="p" variant="body1" color="text.secondary">
        {mensagem}
      </Typography>
    </Paper>
  );
}

function SecaoCatalogo({
  jogos,
  textoBusca,
  filtros,
  ordenacao,
  aoAlterarOrdenacao,
  carregandoInicial,
  carregandoMais,
  temMais,
  mensagemErro,
  aoCarregarMais,
  aoTentarNovamente,
}) {
  const catalogoVazio =
    !carregandoInicial && !mensagemErro && jogos.length === 0;
  const possuiFiltros = temFiltrosAtivos(filtros);
  const mensagemVazia = textoBusca.trim()
    ? possuiFiltros
      ? "Nenhum jogo encontrado para a busca e filtros selecionados. Tente ajustar os critérios."
      : "Nenhum jogo encontrado para a busca informada. Tente outro termo ou altere a ordenação."
    : possuiFiltros
      ? "Nenhum jogo encontrado com os filtros selecionados. Tente outros critérios."
      : "Nenhum jogo disponível no momento. Tente novamente em instantes.";

  return (
    <Box
      component="section"
      aria-labelledby="tituloSecaoCatalogo"
      aria-live="polite"
    >
      <BarraControlesCatalogo
        ordenacao={ordenacao}
        aoAlterarOrdenacao={aoAlterarOrdenacao}
        quantidadeJogos={jogos.length}
        carregandoInicial={carregandoInicial}
        textoBusca={textoBusca}
        possuiFiltros={possuiFiltros}
      />

      {mensagemErro && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <BotaoPadraoPulante color="inherit" size="small" onClick={aoTentarNovamente}>
              Tentar novamente
            </BotaoPadraoPulante>
          }
        >
          {mensagemErro}
        </Alert>
      )}

      {carregandoInicial ? (
        <Box
          sx={ESTILO_GRADE_CATALOGO}
          aria-busy="true"
          aria-label="Carregando jogos"
        >
          {Array.from({ length: QUANTIDADE_SKELETONS }, (_, indice) => (
            <Box key={indice}>
              <CartaoJogoSkeleton />
            </Box>
          ))}
        </Box>
      ) : catalogoVazio ? (
        <EstadoVazioCatalogo mensagem={mensagemVazia} />
      ) : (
        <>
          <Box
            sx={ESTILO_GRADE_CATALOGO}
            role="list"
            aria-label="Lista de jogos digitais"
          >
            {jogos.map((dadosJogo) => (
              <Box key={dadosJogo.identificador} role="listitem">
                <CartaoJogo dadosJogo={dadosJogo} />
              </Box>
            ))}

            {carregandoMais &&
              Array.from({ length: 4 }, (_, indice) => (
                <Box key={`skeleton-mais-${indice}`}>
                  <CartaoJogoSkeleton />
                </Box>
              ))}
          </Box>

          {temMais && (
            <Box display="flex" justifyContent="center" mt={4}>
              <BotaoPadraoPulante
                variant="outlined"
                onClick={aoCarregarMais}
                disabled={carregandoMais}
                startIcon={
                  carregandoMais ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : null
                }
              >
                {carregandoMais ? "Carregando..." : "Carregar mais jogos"}
              </BotaoPadraoPulante>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default SecaoCatalogo;
