import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Badge,
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import {
  FILTROS_INICIAIS,
  OPCOES_FILTRO_CATALOGO,
  contarFiltrosAtivos,
  temFiltrosAtivos,
} from "../constantes/filtrosCatalogo";

function PainelFiltrosCatalogo({ filtros, aoAlterarFiltros, carregandoInicial }) {
  const [expandido, setExpandido] = useState(false);
  const quantidadeFiltrosAtivos = contarFiltrosAtivos(filtros);

  function alterarCampo(campo, valor) {
    aoAlterarFiltros((filtrosAtuais) => ({
      ...filtrosAtuais,
      [campo]: valor,
    }));
  }

  function limparFiltros() {
    aoAlterarFiltros(FILTROS_INICIAIS);
  }

  function alternarPainel() {
    setExpandido((valorAtual) => !valorAtual);
  }

  return (
    <Box component="section" aria-label="Filtros do catálogo" sx={{ mb: 3 }}>
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <Button
          variant="text"
          color="primary"
          onClick={alternarPainel}
          startIcon={
            <Badge
              color="secondary"
              badgeContent={quantidadeFiltrosAtivos}
              invisible={quantidadeFiltrosAtivos === 0}
            >
              <FilterListIcon fontSize="small" />
            </Badge>
          }
          endIcon={
            <ExpandMoreIcon
              fontSize="small"
              sx={{
                transition: "transform 0.2s",
                transform: expandido ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          }
          aria-expanded={expandido}
          aria-controls="painelFiltrosConteudo"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 0.5,
            minWidth: "auto",
          }}
        >
          Filtros
        </Button>

        {!expandido && temFiltrosAtivos(filtros) && (
          <Button
            size="small"
            variant="text"
            onClick={limparFiltros}
            disabled={carregandoInicial}
            sx={{ textTransform: "none" }}
          >
            Limpar filtros
          </Button>
        )}
      </Box>

      <Collapse in={expandido} id="painelFiltrosConteudo">
        <Paper variant="outlined" sx={{ p: 2, mt: 1.5 }}>
          {temFiltrosAtivos(filtros) && (
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                size="small"
                onClick={limparFiltros}
                disabled={carregandoInicial}
              >
                Limpar filtros
              </Button>
            </Box>
          )}

          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            }}
            gap={2}
          >
            <FormControl size="small" fullWidth>
              <InputLabel id="rotuloFiltroGenero">Gênero</InputLabel>
              <Select
                labelId="rotuloFiltroGenero"
                id="filtroGenero"
                value={filtros.genero}
                label="Gênero"
                onChange={(evento) => alterarCampo("genero", evento.target.value)}
                disabled={carregandoInicial}
              >
                {OPCOES_FILTRO_CATALOGO.generos.map((opcao) => (
                  <MenuItem
                    key={opcao.valor || "todos-generos"}
                    value={opcao.valor}
                  >
                    {opcao.rotulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel id="rotuloFiltroPlataforma">Plataforma</InputLabel>
              <Select
                labelId="rotuloFiltroPlataforma"
                id="filtroPlataforma"
                value={filtros.plataforma}
                label="Plataforma"
                onChange={(evento) =>
                  alterarCampo("plataforma", evento.target.value)
                }
                disabled={carregandoInicial}
              >
                {OPCOES_FILTRO_CATALOGO.plataformas.map((opcao) => (
                  <MenuItem
                    key={opcao.valor || "todas-plataformas"}
                    value={opcao.valor}
                  >
                    {opcao.rotulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel id="rotuloFiltroAno">Ano de lançamento</InputLabel>
              <Select
                labelId="rotuloFiltroAno"
                id="filtroAno"
                value={filtros.ano}
                label="Ano de lançamento"
                onChange={(evento) => alterarCampo("ano", evento.target.value)}
                disabled={carregandoInicial}
              >
                {OPCOES_FILTRO_CATALOGO.anos.map((opcao) => (
                  <MenuItem
                    key={opcao.valor || "qualquer-ano"}
                    value={opcao.valor}
                  >
                    {opcao.rotulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel id="rotuloFiltroNota">Nota mínima</InputLabel>
              <Select
                labelId="rotuloFiltroNota"
                id="filtroNotaMinima"
                value={filtros.notaMinima}
                label="Nota mínima"
                onChange={(evento) =>
                  alterarCampo("notaMinima", evento.target.value)
                }
                disabled={carregandoInicial}
              >
                {OPCOES_FILTRO_CATALOGO.notasMinimas.map((opcao) => (
                  <MenuItem
                    key={opcao.valor || "qualquer-nota"}
                    value={opcao.valor}
                  >
                    {opcao.rotulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
}

export default PainelFiltrosCatalogo;
