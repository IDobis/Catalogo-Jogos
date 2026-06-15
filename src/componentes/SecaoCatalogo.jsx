import { Box, Typography } from "@mui/material";
import CartaoJogo from "./CartaoJogo";

function SecaoCatalogo({ jogosFiltrados }) {
  const catalogoVazio = jogosFiltrados.length === 0;

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

      {catalogoVazio ? (
        <Typography
          component="p"
          variant="body1"
          color="text.secondary"
          textAlign="center"
          py={6}
        >
          Nenhum jogo encontrado para a busca informada.
        </Typography>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
          gap={3}
          role="list"
          aria-label="Lista de jogos digitais"
        >
          {jogosFiltrados.map((dadosJogo) => (
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
