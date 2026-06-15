import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import CartaoJogo from "./CartaoJogo";

function SecaoCatalogo({ jogos, textoBusca, carregando, mensagemErro }) {
  const catalogoVazio = !carregando && !mensagemErro && jogos.length === 0;
  const mensagemVazia = textoBusca.trim()
    ? "Nenhum jogo encontrado para a busca informada."
    : "Nenhum jogo disponível no momento.";

  return (
    <Box
      component="section"
      aria-labelledby="tituloSecaoCatalogo"
      aria-live="polite"
    >
      <Typography
        component="h2"
        id="tituloSecaoCatalogo"
        variant="h5"
        gutterBottom
        mb={3}
      >
        Jogos disponíveis
      </Typography>

      {mensagemErro && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {mensagemErro}
        </Alert>
      )}

      {carregando ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress aria-label="Carregando jogos" />
        </Box>
      ) : catalogoVazio ? (
        <Typography
          component="p"
          variant="body1"
          color="text.secondary"
          textAlign="center"
          py={6}
        >
          {mensagemVazia}
        </Typography>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
          gap={3}
          role="list"
          aria-label="Lista de jogos digitais"
        >
          {jogos.map((dadosJogo) => (
            <Box key={dadosJogo.identificador} role="listitem">
              <CartaoJogo dadosJogo={dadosJogo} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SecaoCatalogo;
