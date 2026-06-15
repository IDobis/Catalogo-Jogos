import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Tooltip } from "@mui/material";
import { useArmazenamentoPessoal } from "../contextos/ArmazenamentoPessoalContext";

function BotaoFavorito({ dadosJogo, tamanho = "small" }) {
  const { ehFavorito, alternarFavorito } = useArmazenamentoPessoal();
  const marcado = ehFavorito(dadosJogo.identificador);

  function aoClicar(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    alternarFavorito(dadosJogo);
  }

  return (
    <Tooltip title={marcado ? "Remover dos favoritos" : "Adicionar aos favoritos"}>
      <IconButton
        size={tamanho}
        onClick={aoClicar}
        aria-label={
          marcado ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
        aria-pressed={marcado}
        sx={{
          color: marcado ? "secondary.main" : "text.secondary",
          "&:hover": {
            color: marcado ? "secondary.light" : "secondary.main",
          },
        }}
      >
        {marcado ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}

export default BotaoFavorito;
