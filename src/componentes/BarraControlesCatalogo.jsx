import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { OPCOES_ORDENACAO } from "../constantes/ordenacaoCatalogo";

function BarraControlesCatalogo({
  ordenacao,
  aoAlterarOrdenacao,
  quantidadeJogos,
  carregandoInicial,
  textoBusca,
  possuiFiltros,
}) {
  const textoContagem = carregandoInicial
    ? "Buscando jogos..."
    : quantidadeJogos === 0
      ? textoBusca.trim() || possuiFiltros
        ? "Nenhum resultado"
        : "Nenhum jogo listado"
      : quantidadeJogos === 1
        ? "1 jogo encontrado"
        : `${quantidadeJogos} jogos encontrados`;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "stretch", sm: "flex-end" }}
      justifyContent="space-between"
      gap={2}
      mb={3}
    >
      <Box>
        <Typography component="h2" id="tituloSecaoCatalogo" variant="h5">
          Jogos disponíveis
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
          aria-live="polite"
        >
          {textoContagem}
        </Typography>
      </Box>

      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="rotuloOrdenacaoCatalogo">Ordenar por</InputLabel>
        <Select
          labelId="rotuloOrdenacaoCatalogo"
          id="selecaoOrdenacaoCatalogo"
          value={ordenacao}
          label="Ordenar por"
          onChange={(evento) => aoAlterarOrdenacao(evento.target.value)}
          disabled={carregandoInicial}
        >
          {OPCOES_ORDENACAO.map((opcao) => (
            <MenuItem key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BarraControlesCatalogo;
