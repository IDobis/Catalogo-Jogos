import { Box, Typography } from "@mui/material";

function CabecalhoCatalogo() {
  return (
    <Box component="header" textAlign="center" mb={{ xs: 2.5, md: 4 }}>
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        sx={{ typography: { xs: "h5", sm: "h4" } }}
      >
        Catálogo de Jogos Digitais
      </Typography>

      <Typography
        component="p"
        variant="subtitle1"
        color="text.secondary"
        sx={{ typography: { xs: "body2", sm: "subtitle1" }, px: { xs: 1, sm: 0 } }}
      >
        Encontre seu próximo jogo favorito
      </Typography>
    </Box>
  );
}

export default CabecalhoCatalogo;
