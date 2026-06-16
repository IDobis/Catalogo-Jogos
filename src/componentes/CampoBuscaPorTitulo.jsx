import { Box, TextField } from "@mui/material";

function CampoBuscaPorTitulo({ valor, aoAlterar, compacto = false }) {
  return (
    <Box
      component="search"
      aria-label="Busca de jogos por título"
      sx={{ width: "100%" }}
    >
      <TextField
        id="campoBuscaPorTitulo"
        name="buscaPorTitulo"
        type="search"
        label={compacto ? undefined : "Buscar por título"}
        placeholder="Buscar por título..."
        value={valor}
        onChange={(evento) => aoAlterar(evento.target.value)}
        autoComplete="off"
        size={compacto ? "small" : "medium"}
        fullWidth
        aria-label="Buscar jogos por título"
        sx={{
          maxWidth: compacto ? "none" : 400,
          ...(compacto && {
            "& .MuiOutlinedInput-root": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.04)"
                  : "rgba(0, 0, 0, 0.02)",
            },
          }),
        }}
      />
    </Box>
  );
}

export default CampoBuscaPorTitulo;
