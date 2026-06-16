import { Button } from "@mui/material";
import { botaoPadraoPulante } from "../constantes/estilosBotao";

function BotaoPadraoPulante({
  sx,
  corHover,
  sombraHover,
  apenasMovimento = false,
  deslocamentoHover,
  ...props
}) {
  const { color = "primary", variant = "text" } = props;

  return (
    <Button
      {...props}
      sx={{
        ...botaoPadraoPulante({
          cor: color,
          variant,
          corHover,
          sombraHover,
          apenasMovimento,
          deslocamentoHover,
        }),
        ...sx,
      }}
    />
  );
}

export default BotaoPadraoPulante;
