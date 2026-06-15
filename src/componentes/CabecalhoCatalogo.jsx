import { Box, TextField, Typography } from "@mui/material";

function CabecalhoCatalogo({ textoBusca, aoAlterarBusca }) {
  return (
    <Box component="header" textAlign="center" mb={4}>
      <Typography component="h1" variant="h4" gutterBottom>
        Catálogo de Jogos Digitais
      </Typography>

      <Typography component="p" variant="subtitle1" color="text.secondary" mb={3}>
        Encontre seu próximo jogo favorito
      </Typography>

      <Box
        component="search"
        aria-label="Busca de jogos por título"
        display="flex"
        justifyContent="center"
      >
        <TextField
          id="campoBuscaPorTitulo"
          name="buscaPorTitulo"
          type="search"
          label="Buscar por título"
          placeholder="Digite o nome do jogo..."
          value={textoBusca}
          onChange={(evento) => aoAlterarBusca(evento.target.value)}
          autoComplete="off"
          sx={{ width: "100%", maxWidth: 400 }}
        />
      </Box>
    </Box>
  );
}

export default CabecalhoCatalogo;
