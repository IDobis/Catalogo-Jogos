import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
} from "@mui/material";

const estiloBotaoCancelar = {
  textTransform: "none",
  fontWeight: 600,
  px: 2.5,
  color: "primary.main",
  transition: "all 0.2s ease",
  "&:hover": {
    bgcolor: "rgba(108, 92, 231, 0.14)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0) scale(0.98)",
  },
};

const estiloBotaoExcluir = {
  textTransform: "none",
  fontWeight: 700,
  px: 2.5,
  transition: "all 0.25s ease",
  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.35)",
  "&:hover": {
    transform: "translateY(-2px) scale(1.03)",
    boxShadow: "0 8px 24px rgba(211, 47, 47, 0.5)",
  },
  "&:active": {
    transform: "translateY(0) scale(0.97)",
    boxShadow: "0 2px 6px rgba(211, 47, 47, 0.4)",
  },
  "&.Mui-disabled": {
    bgcolor: "error.dark",
    color: "error.contrastText",
    opacity: 0.85,
  },
};

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
        <Button onClick={aoFechar} disabled={excluindo} sx={estiloBotaoCancelar}>
          Cancelar
        </Button>
        <Button
          onClick={confirmar}
          color="error"
          variant="contained"
          disabled={excluindo}
          startIcon={
            excluindo ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <DeleteForeverIcon />
            )
          }
          sx={estiloBotaoExcluir}
        >
          {excluindo ? "Excluindo..." : "Excluir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirmarExclusao;
