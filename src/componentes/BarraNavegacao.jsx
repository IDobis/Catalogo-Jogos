import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Collapse,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { alpha, keyframes } from "@mui/material/styles";
import { linkPadraoPulante } from "../constantes/estilosBotao";
import { CHAVE_NAVBAR_EXPANDIDA } from "../constantes/layoutCatalogo";
import { useBuscaCatalogo } from "../contextos/BuscaCatalogoContext";
import { useTema } from "../contextos/TemaContext";
import CampoBuscaPorTitulo from "./CampoBuscaPorTitulo";

const pulsarIconeTema = keyframes`
  0% { transform: scale(1); }
  45% { transform: scale(1.35); }
  100% { transform: scale(1); }
`;

const estiloLinkBase = {
  display: "inline-block",
  color: "text.secondary",
  textDecoration: "none",
  px: { xs: 1, sm: 1.5 },
  py: 0.75,
  borderRadius: 1,
  fontWeight: 500,
  fontSize: { xs: "0.875rem", sm: "1rem" },
  whiteSpace: "nowrap",
  ...linkPadraoPulante(),
  "&:hover": {
    ...linkPadraoPulante()["&:hover"],
    color: "primary.main",
  },
};

const estiloLinkAtivo = {
  color: "primary.main",
  bgcolor: (theme) =>
    theme.palette.mode === "dark"
      ? "rgba(108, 92, 231, 0.12)"
      : "rgba(108, 92, 231, 0.14)",
};

function ItemNavegacao({ to, children, end = false }) {
  return (
    <NavLink to={to} end={end} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box component="span" sx={{ ...estiloLinkBase, ...(isActive ? estiloLinkAtivo : {}) }}>
          {children}
        </Box>
      )}
    </NavLink>
  );
}

function BotaoAlternarTema() {
  const { ehModoClaro, alternarModo } = useTema();
  const [pulsando, setPulsando] = useState(false);

  const aoClicar = useCallback(() => {
    setPulsando(true);
    alternarModo();
  }, [alternarModo]);

  return (
    <Tooltip title={ehModoClaro ? "Ativar modo escuro" : "Ativar modo claro"}>
      <IconButton
        onClick={aoClicar}
        color="primary"
        disableRipple
        aria-label={ehModoClaro ? "Ativar modo escuro" : "Ativar modo claro"}
        sx={{
          bgcolor: "transparent",
          transition: "background-color 0.2s ease",
          "& .MuiSvgIcon-root": {
            transition: "opacity 0.2s ease",
            opacity: 0.85,
          },
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            "& .MuiSvgIcon-root": {
              opacity: 1,
            },
          },
        }}
      >
        <Box
          component="span"
          onAnimationEnd={() => setPulsando(false)}
          sx={{
            display: "flex",
            animation: pulsando ? `${pulsarIconeTema} 0.45s ease` : "none",
          }}
        >
          {ehModoClaro ? <DarkModeIcon /> : <LightModeIcon />}
        </Box>
      </IconButton>
    </Tooltip>
  );
}

function lerPreferenciaNavbarExpandida() {
  try {
    const valor = localStorage.getItem(CHAVE_NAVBAR_EXPANDIDA);

    if (valor === null) {
      return true;
    }

    return valor === "true";
  } catch {
    return true;
  }
}

function BarraNavegacao() {
  const { textoBusca, setTextoBusca } = useBuscaCatalogo();
  const [navbarExpandida, setNavbarExpandida] = useState(lerPreferenciaNavbarExpandida);

  const alternarNavbar = useCallback(() => {
    setNavbarExpandida((valorAtual) => {
      const proximoValor = !valorAtual;
      localStorage.setItem(CHAVE_NAVBAR_EXPANDIDA, String(proximoValor));
      return proximoValor;
    });
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(theme) => ({
        bgcolor: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.65 : 0.72),
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        borderBottom: 1,
        borderColor: alpha(
          theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.08 : 0.14
        ),
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 4px 24px ${alpha(theme.palette.common.black, 0.35)}`
            : `0 4px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
      })}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: { xs: 0.5, md: 0.25 },
          }}
        >
          <Tooltip title={navbarExpandida ? "Esconder navegação" : "Mostrar navegação"}>
            <IconButton
              onClick={alternarNavbar}
              color="primary"
              aria-expanded={navbarExpandida}
              aria-controls="conteudo-navbar"
              aria-label={navbarExpandida ? "Esconder navegação" : "Mostrar navegação"}
              sx={{
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <MenuOpenIcon />
            </IconButton>
          </Tooltip>

          <BotaoAlternarTema />
        </Box>

        <Collapse in={navbarExpandida} id="conteudo-navbar">
          <Toolbar
            disableGutters
            sx={{
              pb: { xs: 1.25, md: 1 },
              pt: 0,
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              gap: { xs: 1.25, md: 0 },
            }}
          >
            <Box
              component="nav"
              aria-label="Navegação principal"
              sx={{
                display: "flex",
                gap: 0.5,
                flexShrink: 0,
                width: { xs: "100%", md: "auto" },
                mr: { md: 2 },
                overflowX: { xs: "auto", md: "visible" },
                justifyContent: { xs: "center", md: "flex-start" },
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <ItemNavegacao to="/" end>
                Início
              </ItemNavegacao>
              <ItemNavegacao to="/favoritos">Favoritos</ItemNavegacao>
              <ItemNavegacao to="/minha-lista">Minha Lista</ItemNavegacao>
            </Box>

            <Box
              sx={{
                flex: { md: 1 },
                minWidth: 0,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <CampoBuscaPorTitulo
                valor={textoBusca}
                aoAlterar={setTextoBusca}
                compacto
              />
            </Box>
          </Toolbar>
        </Collapse>
      </Container>
    </AppBar>
  );
}

export default BarraNavegacao;
