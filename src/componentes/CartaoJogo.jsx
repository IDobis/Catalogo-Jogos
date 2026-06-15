import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

function CartaoJogo({ dadosJogo }) {
  return (
    <Card
      component="article"
      aria-label={`Jogo ${dadosJogo.titulo}, gênero ${dadosJogo.genero}, plataforma ${dadosJogo.plataforma}`}
      sx={{
        height: "100%",
        transition: "transform 0.2s, border-color 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "primary.main",
        },
      }}
    >
      {dadosJogo.urlImagemCapa && (
        <CardMedia
          component="img"
          image={dadosJogo.urlImagemCapa}
          alt={`Capa do jogo ${dadosJogo.titulo}`}
          loading="lazy"
          sx={{ aspectRatio: "3 / 4", objectFit: "cover" }}
        />
      )}

      <CardContent>
        <Typography component="h3" variant="h6" gutterBottom>
          {dadosJogo.titulo}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label={dadosJogo.genero} size="small" variant="outlined" />
          <Chip
            label={dadosJogo.plataforma}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CartaoJogo;
