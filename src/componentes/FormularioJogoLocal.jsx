import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const CAMPOS_INICIAIS = {
  titulo: "",
  genero: "",
  plataforma: "",
  urlImagemCapa: "",
  anoLancamento: "",
  nota: "",
};

function FormularioJogoLocal({
  aberto,
  aoFechar,
  aoSalvar,
  jogoEmEdicao = null,
}) {
  const [campos, setCampos] = useState(CAMPOS_INICIAIS);
  const modoEdicao = Boolean(jogoEmEdicao);

  useEffect(() => {
    if (!aberto) {
      return;
    }

    if (jogoEmEdicao) {
      setCampos({
        titulo: jogoEmEdicao.titulo ?? "",
        genero: jogoEmEdicao.genero === "—" ? "" : jogoEmEdicao.genero ?? "",
        plataforma:
          jogoEmEdicao.plataforma === "—" ? "" : jogoEmEdicao.plataforma ?? "",
        urlImagemCapa: jogoEmEdicao.urlImagemCapa ?? "",
        anoLancamento:
          jogoEmEdicao.anoLancamento != null
            ? String(jogoEmEdicao.anoLancamento)
            : "",
        nota: jogoEmEdicao.nota != null ? String(jogoEmEdicao.nota) : "",
      });
      return;
    }

    setCampos(CAMPOS_INICIAIS);
  }, [aberto, jogoEmEdicao]);

  function alterarCampo(campo, valor) {
    setCampos((estadoAtual) => ({
      ...estadoAtual,
      [campo]: valor,
    }));
  }

  function aoEnviar(evento) {
    evento.preventDefault();

    if (!campos.titulo.trim()) {
      return;
    }

    aoSalvar(campos);
    aoFechar();
  }

  return (
    <Dialog open={aberto} onClose={aoFechar} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={aoEnviar}>
        <DialogTitle>
          {modoEdicao ? "Editar jogo" : "Adicionar jogo à lista"}
        </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Título"
            value={campos.titulo}
            onChange={(evento) => alterarCampo("titulo", evento.target.value)}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Gênero"
            value={campos.genero}
            onChange={(evento) => alterarCampo("genero", evento.target.value)}
            fullWidth
          />
          <TextField
            label="Plataforma"
            value={campos.plataforma}
            onChange={(evento) =>
              alterarCampo("plataforma", evento.target.value)
            }
            fullWidth
          />
          <TextField
            label="URL da capa (opcional)"
            value={campos.urlImagemCapa}
            onChange={(evento) =>
              alterarCampo("urlImagemCapa", evento.target.value)
            }
            fullWidth
          />
          <TextField
            label="Ano de lançamento"
            type="number"
            value={campos.anoLancamento}
            onChange={(evento) =>
              alterarCampo("anoLancamento", evento.target.value)
            }
            fullWidth
            inputProps={{ min: 1970, max: 2100 }}
          />
          <TextField
            label="Nota (0–100)"
            type="number"
            value={campos.nota}
            onChange={(evento) => alterarCampo("nota", evento.target.value)}
            fullWidth
            inputProps={{ min: 0, max: 100 }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={aoFechar}>Cancelar</Button>
        <Button type="submit" variant="contained">
          {modoEdicao ? "Salvar alterações" : "Adicionar"}
        </Button>
      </DialogActions>
      </Box>
    </Dialog>
  );
}

export default FormularioJogoLocal;
