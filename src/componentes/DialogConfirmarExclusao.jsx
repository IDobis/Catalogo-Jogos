import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import BotaoPadraoPulante from "./BotaoPadraoPulante";

function DialogConfirmarExclusao({
  aberto,
  tituloJogo,
  aoCancelar,
  aoConfirmar,
}) {
  const [excluindo, setExcluindo] = useState(false);

  function aoFechar() {
    if (!excluindo) {
      aoCancelar();
    }
  }

  async function confirmar() {
    setExcluindo(true);

    try {
      await aoConfirmar();
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <Dialog
      open={aberto}
      onClose={aoFechar}
      aria-labelledby="tituloConfirmarExclusao"
      slots={{ transition: Zoom }}
      slotProps={{
        paper: {
          sx: {
            border: 1,
            borderColor: "divider",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        sx={{
          height: 4,
          bgcolor: "error.main",
          animation: aberto ? "pulsoBarraExclusao 1.6s ease-in-out infinite" : "none",
          "@keyframes pulsoBarraExclusao": {
            "0%, 100%": { opacity: 0.55 },
            "50%": { opacity: 1 },
          },
        }}
      />

      <DialogTitle id="tituloConfirmarExclusao" sx={{ pt: 2.5 }}>
        Excluir jogo?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja remover <strong>{tituloJogo}</strong> da sua
          lista? Esta ação não pode ser desfeita.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <BotaoPadraoPulante
          onClick={aoFechar}
          disabled={excluindo}
          corHover="rgba(108, 92, 231, 0.14)"
          sx={{ px: 2.5, color: "primary.main" }}
        >
          Cancelar
        </BotaoPadraoPulante>
        <BotaoPadraoPulante
          onClick={confirmar}
          color="error"
          variant="contained"
          disabled={excluindo}
          corHover="error.dark"
          sombraHover={(theme) =>
            `0 4px 14px ${alpha(theme.palette.error.main, 0.42)}`
          }
          startIcon={
            excluindo ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <DeleteForeverIcon />
            )
          }
          sx={{
            px: 2.5,
            boxShadow: "0 2px 8px rgba(211, 47, 47, 0.35)",
            "&:active": {
              boxShadow: "0 2px 6px rgba(211, 47, 47, 0.4)",
            },
            "&.Mui-disabled": {
              bgcolor: "error.dark",
              color: "error.contrastText",
              opacity: 0.85,
            },
          }}
        >
          {excluindo ? "Excluindo..." : "Excluir"}
        </BotaoPadraoPulante>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirmarExclusao;
