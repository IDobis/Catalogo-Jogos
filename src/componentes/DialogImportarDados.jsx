import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import BotaoPadraoPulante from "./BotaoPadraoPulante";

function DialogImportarDados({ aberto, resumo, aoCancelar, aoConfirmar }) {
  const quantidadeFavoritos = resumo?.quantidadeFavoritos ?? 0;
  const quantidadeMinhaLista = resumo?.quantidadeMinhaLista ?? 0;

  return (
    <Dialog
      open={aberto}
      onClose={aoCancelar}
      aria-labelledby="tituloImportarDados"
    >
      <DialogTitle id="tituloImportarDados">Importar backup</DialogTitle>

      <DialogContent>
        <DialogContentText>
          O arquivo contém{" "}
          <strong>
            {quantidadeFavoritos} favorito(s)
          </strong>{" "}
          e{" "}
          <strong>
            {quantidadeMinhaLista} jogo(s) na minha lista
          </strong>
          . Como deseja importar?
        </DialogContentText>
        <DialogContentText sx={{ mt: 2 }}>
          <strong>Mesclar</strong> adiciona e atualiza itens sem remover os
          atuais. <strong>Substituir</strong> apaga favoritos e minha lista
          existentes e usa apenas os dados do arquivo.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1, flexWrap: "wrap" }}>
        <BotaoPadraoPulante
          variant="contained"
          color="success"
          onClick={() => aoConfirmar("mesclar")}
        >
          Mesclar
        </BotaoPadraoPulante>
        <BotaoPadraoPulante
          variant="contained"
          color="warning"
          onClick={() => aoConfirmar("substituir")}
        >
          Substituir tudo
        </BotaoPadraoPulante>
        <BotaoPadraoPulante onClick={aoCancelar}>Cancelar</BotaoPadraoPulante>
      </DialogActions>
    </Dialog>
  );
}

export default DialogImportarDados;
