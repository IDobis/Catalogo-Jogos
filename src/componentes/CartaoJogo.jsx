import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import BotaoFavorito from "./BotaoFavorito";
import IconButtonPadraoPulante from "./IconButtonPadraoPulante";

function AreaCapaJogo() {
  return (
    <Box
      sx={{
        aspectRatio: "3 / 4",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Capa indisponível
      </Typography>
    </Box>
  );
}

function CartaoJogo({
  dadosJogo,
  origem = "catalogo",
  exibirFavorito = true,
  priorizarCarregamento = false,
  aoEditar,
  aoExcluir,
}) {
  const [erroImagem, setErroImagem] = useState(false);
  const exibirPlaceholder = !dadosJogo.urlImagemCapa || erroImagem;
  const ehLocal = origem === "local";
  const ehFavorito = origem === "favorito";

  const capa = exibirPlaceholder ? (
    <AreaCapaJogo />
  ) : (
    <CardMedia
      component="img"
      image={dadosJogo.urlImagemCapa}
      alt={`Capa do jogo ${dadosJogo.titulo}`}
      loading={priorizarCarregamento ? "eager" : "lazy"}
      onError={() => setErroImagem(true)}
      sx={{ aspectRatio: "3 / 4", objectFit: "cover" }}
    />
  );

  const conteudo = (
    <>
      <Box sx={{ position: "relative" }}>
        {exibirFavorito && !ehLocal && (
          <Box
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              zIndex: 2,
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(15, 15, 20, 0.75)"
                  : "rgba(255, 255, 255, 0.85)",
              borderRadius: "50%",
            }}
          >
            <BotaoFavorito dadosJogo={dadosJogo} />
          </Box>
        )}
        {capa}
      </Box>

      <CardContent sx={{ flexGrow: 1, width: "100%" }}>
        <Stack direction="row" spacing={1} mb={1} flexWrap="wrap" useFlexGap>
          {ehFavorito && (
            <Chip
              label="Favorito"
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}
          {ehLocal && (
            <Chip
              label="Minha lista"
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Stack>

        <Typography
          component="h3"
          variant="h6"
          gutterBottom
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {dadosJogo.titulo}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={1}>
          {dadosJogo.nota != null && (
            <Chip
              label={`★ ${dadosJogo.nota}`}
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}
          {dadosJogo.anoLancamento != null && (
            <Chip
              label={dadosJogo.anoLancamento}
              size="small"
              variant="outlined"
            />
          )}
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label={dadosJogo.genero} size="small" variant="outlined" />
          <Chip
            label={dadosJogo.plataforma}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Stack>

        {ehLocal && (
          <Stack direction="row" spacing={1} mt={2}>
            <Tooltip title="Editar jogo">
              <IconButtonPadraoPulante
                size="small"
                aria-label={`Editar ${dadosJogo.titulo}`}
                onClick={() => aoEditar?.(dadosJogo)}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButtonPadraoPulante>
            </Tooltip>
            <Tooltip title="Excluir jogo">
              <IconButtonPadraoPulante
                size="small"
                color="error"
                aria-label={`Excluir ${dadosJogo.titulo}`}
                onClick={() => aoExcluir?.(dadosJogo)}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButtonPadraoPulante>
            </Tooltip>
          </Stack>
        )}
      </CardContent>
    </>
  );

  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s, border-color 0.2s",
        borderStyle: ehLocal ? "dashed" : "solid",
        borderColor: ehFavorito
          ? "secondary.dark"
          : ehLocal
            ? "primary.dark"
            : "divider",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: ehFavorito ? "secondary.main" : "primary.main",
        },
      }}
    >
      {ehLocal ? (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {conteudo}
        </Box>
      ) : (
        <CardActionArea
          component={RouterLink}
          to={`/jogo/${dadosJogo.identificador}`}
          aria-label={`Ver detalhes de ${dadosJogo.titulo}`}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {conteudo}
        </CardActionArea>
      )}
    </Card>
  );
}

export default CartaoJogo;
