import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import BarraExportarImportarDados from "../componentes/BarraExportarImportarDados";
import CartaoJogo from "../componentes/CartaoJogo";
import { useArmazenamentoPessoal } from "../contextos/ArmazenamentoPessoalContext";
import { ESTILO_GRADE_CATALOGO } from "../constantes/layoutCatalogo";

function PaginaFavoritos() {
  const { favoritos } = useArmazenamentoPessoal();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "flex-start" }}
        justifyContent="space-between"
        gap={2}
        mb={4}
      >
        <Box>
          <Typography component="h1" variant="h4" gutterBottom>
            Favoritos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Jogos da IGDB que você marcou como favoritos.
          </Typography>
        </Box>

        <BarraExportarImportarDados />
      </Stack>

      {favoritos.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            py: 6,
            px: 3,
            textAlign: "center",
            borderStyle: "dashed",
          }}
        >
          <Typography color="text.secondary">
            Nenhum favorito ainda. Explore o catálogo e clique no coração nos
            jogos que mais gostar.
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={ESTILO_GRADE_CATALOGO}
          role="list"
          aria-label="Jogos favoritos"
        >
          {favoritos.map((dadosJogo) => (
            <Box key={dadosJogo.identificador} role="listitem">
              <CartaoJogo dadosJogo={dadosJogo} origem="favorito" />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default PaginaFavoritos;
