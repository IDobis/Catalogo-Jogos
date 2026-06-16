import { useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  Alert,
  Snackbar,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useArmazenamentoPessoal } from "../contextos/ArmazenamentoPessoalContext";
import { parsearArquivoImportacao } from "../utilidades/armazenamentoPessoalExportacao";
import BotaoPadraoPulante from "./BotaoPadraoPulante";
import DialogImportarDados from "./DialogImportarDados";

const estiloBaseBotao = {
  px: 2.25,
  py: 0.85,
  borderRadius: 2,
};

const estiloBotaoExportar = {
  ...estiloBaseBotao,
  color: "common.white",
  bgcolor: "primary.main",
  border: 1,
  borderColor: (theme) => alpha(theme.palette.primary.light, 0.22),
};

const estiloBotaoImportar = {
  ...estiloBaseBotao,
  color: "primary.main",
  bgcolor: (theme) =>
    alpha(
      theme.palette.primary.main,
      theme.palette.mode === "dark" ? 0.14 : 0.1
    ),
  border: 1,
  borderColor: (theme) => alpha(theme.palette.primary.main, 0.35),
  "&:hover": {
    borderColor: "primary.main",
  },
};

function lerArquivoTexto(arquivo) {
  return new Promise((resolver, rejeitar) => {
    const leitor = new FileReader();

    leitor.onload = () => resolver(leitor.result);
    leitor.onerror = () =>
      rejeitar(new Error("Não foi possível ler o arquivo selecionado."));

    leitor.readAsText(arquivo);
  });
}

function BarraExportarImportarDados() {
  const { exportarDados, importarDados } = useArmazenamentoPessoal();
  const entradaArquivoRef = useRef(null);
  const [dadosParaImportar, setDadosParaImportar] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function aoExportar() {
    exportarDados();
    setFeedback({
      severidade: "success",
      mensagem: "Backup exportado com sucesso.",
    });
  }

  function abrirSeletorArquivo() {
    entradaArquivoRef.current?.click();
  }

  async function aoSelecionarArquivo(evento) {
    const arquivo = evento.target.files?.[0];
    evento.target.value = "";

    if (!arquivo) {
      return;
    }

    if (!arquivo.name.toLowerCase().endsWith(".json")) {
      setFeedback({
        severidade: "error",
        mensagem: "Selecione um arquivo JSON (.json).",
      });
      return;
    }

    try {
      const conteudo = await lerArquivoTexto(arquivo);
      const resultado = parsearArquivoImportacao(conteudo);

      if (!resultado.sucesso) {
        setFeedback({
          severidade: "error",
          mensagem: resultado.mensagem,
        });
        return;
      }

      setDadosParaImportar(resultado);
    } catch {
      setFeedback({
        severidade: "error",
        mensagem: "Não foi possível ler o arquivo selecionado.",
      });
    }
  }

  function aoConfirmarImportacao(modo) {
    if (!dadosParaImportar) {
      return;
    }

    const estatisticas = importarDados(dadosParaImportar.dados, modo);
    setDadosParaImportar(null);
    setFeedback({
      severidade: "success",
      mensagem: `Importação concluída: ${estatisticas.favoritos} favorito(s) e ${estatisticas.minhaLista} jogo(s) na minha lista.`,
    });
  }

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
        <BotaoPadraoPulante
          variant="contained"
          disableElevation
          corHover="primary.dark"
          startIcon={<SaveAltIcon />}
          onClick={aoExportar}
          sx={estiloBotaoExportar}
        >
          Exportar JSON
        </BotaoPadraoPulante>
        <BotaoPadraoPulante
          variant="outlined"
          corHover={(theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.26 : 0.16
            )
          }
          sombraHover={(theme) =>
            `0 2px 10px ${alpha(theme.palette.primary.main, 0.2)}`
          }
          startIcon={<FileUploadIcon />}
          onClick={abrirSeletorArquivo}
          sx={estiloBotaoImportar}
        >
          Importar JSON
        </BotaoPadraoPulante>
        <input
          ref={entradaArquivoRef}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={aoSelecionarArquivo}
        />
      </Stack>

      <DialogImportarDados
        aberto={Boolean(dadosParaImportar)}
        resumo={dadosParaImportar?.resumo}
        aoCancelar={() => setDadosParaImportar(null)}
        aoConfirmar={aoConfirmarImportacao}
      />

      <Snackbar
        open={Boolean(feedback)}
        autoHideDuration={5000}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {feedback ? (
          <Alert
            onClose={() => setFeedback(null)}
            severity={feedback.severidade}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {feedback.mensagem}
          </Alert>
        ) : null}
      </Snackbar>
    </>
  );
}

export default BarraExportarImportarDados;
