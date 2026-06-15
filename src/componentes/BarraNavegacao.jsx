import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { NavLink } from "react-router-dom";
import { AppBar, Box, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTema } from "../contextos/TemaContext";
const estiloLinkBase = {
  display: "inline-block",
  color: "text.secondary",
  textDecoration: "none",
  px: 1.5,
  py: 0.75,
  borderRadius: 1,
  fontWeight: 500,
  transition: "color 0.2s, background-color 0.2s",
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

function BarraNavegacao() {
  const { ehModoClaro, alternarModo } = useTema();

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
    >      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, py: 1 }}>
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              fontWeight: 700,
              mr: { sm: 2 },
            }}
          >
            Catálogo
          </Typography>

          <Box
            component="nav"
            aria-label="Navegação principal"
            display="flex"
            gap={0.5}
            flexWrap="wrap"
            flexGrow={1}
          >
            <ItemNavegacao to="/" end>
              Início
            </ItemNavegacao>
            <ItemNavegacao to="/favoritos">Favoritos</ItemNavegacao>
            <ItemNavegacao to="/minha-lista">Minha Lista</ItemNavegacao>
          </Box>

          <Tooltip title={ehModoClaro ? "Ativar modo escuro" : "Ativar modo claro"}>
            <IconButton
              onClick={alternarModo}
              color="primary"
              aria-label={ehModoClaro ? "Ativar modo escuro" : "Ativar modo claro"}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(108, 92, 231, 0.12)"
                    : "rgba(108, 92, 231, 0.1)",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(108, 92, 231, 0.22)"
                      : "rgba(108, 92, 231, 0.18)",
                },
              }}
            >
              {ehModoClaro ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default BarraNavegacao;
