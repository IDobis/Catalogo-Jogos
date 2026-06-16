import { Box, Typography } from "@mui/material";

function CabecalhoCatalogo() {
  return (
    <Box component="header" textAlign="center" mb={4}>
      <Typography component="h1" variant="h4" gutterBottom>
        Catálogo de Jogos Digitais
      </Typography>

      <Typography component="p" variant="subtitle1" color="text.secondary">
        Encontre seu próximo jogo favorito
      </Typography>
    </Box>
  );
}

export default CabecalhoCatalogo;
