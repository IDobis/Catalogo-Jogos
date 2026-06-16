import { IconButton } from "@mui/material";
import { botaoPadraoPulante } from "../constantes/estilosBotao";

function IconButtonPadraoPulante({
  sx,
  corHover,
  sombraHover,
  apenasMovimento = true,
  deslocamentoHover,
  ...props
}) {
  const { color = "default" } = props;
  const cor = color === "default" ? "primary" : color;

  return (
    <IconButton
      {...props}
      sx={{
        ...botaoPadraoPulante({
          cor,
          variant: "text",
          corHover,
          sombraHover: sombraHover ?? "none",
          apenasMovimento,
          deslocamentoHover,
        }),
        ...sx,
      }}
    />
  );
}

export default IconButtonPadraoPulante;
