import { alpha } from "@mui/material/styles";

function obterCorHover(cor, variant, theme) {
  if (cor === "inherit") {
    return alpha(
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
      0.08
    );
  }

  const palette = theme.palette[cor];

  if (!palette?.main) {
    return alpha(theme.palette.primary.main, 0.12);
  }

  if (variant === "contained") {
    return palette.dark;
  }

  const opacidade =
    variant === "outlined"
      ? theme.palette.mode === "dark"
        ? 0.14
        : 0.1
      : theme.palette.mode === "dark"
        ? 0.14
        : 0.08;

  return alpha(palette.main, opacidade);
}

function obterSombraHover(cor, variant, theme) {
  if (variant !== "contained") {
    return "none";
  }

  const corBase =
    cor === "inherit"
      ? theme.palette.primary.main
      : theme.palette[cor]?.main ?? theme.palette.primary.main;

  return `0 4px 14px ${alpha(corBase, 0.35)}`;
}

function botaoPadraoPulante({
  cor = "primary",
  variant = "text",
  corHover,
  sombraHover,
  deslocamentoHover = -1,
  apenasMovimento = false,
} = {}) {
  const efeitoMovimento = {
    transition: "all 0.22s ease",
    "&:hover": {
      transform: `translateY(${deslocamentoHover}px)`,
    },
    "&:active": {
      transform: "translateY(0) scale(0.98)",
    },
  };

  if (apenasMovimento) {
    return {
      textTransform: "none",
      fontWeight: 600,
      ...efeitoMovimento,
    };
  }

  return {
    textTransform: "none",
    fontWeight: 600,
    ...efeitoMovimento,
    "&:hover": {
      ...efeitoMovimento["&:hover"],
      bgcolor: corHover ?? ((theme) => obterCorHover(cor, variant, theme)),
      boxShadow:
        sombraHover !== undefined
          ? sombraHover
          : (theme) => obterSombraHover(cor, variant, theme),
    },
  };
}

function linkPadraoPulante({
  corHover,
  deslocamentoHover = -1,
} = {}) {
  return {
    transition: "all 0.22s ease",
    "&:hover": {
      transform: `translateY(${deslocamentoHover}px)`,
      bgcolor:
        corHover ??
        ((theme) =>
          theme.palette.mode === "dark"
            ? "rgba(108, 92, 231, 0.12)"
            : "rgba(108, 92, 231, 0.1)"),
    },
    "&:active": {
      transform: "translateY(0) scale(0.98)",
    },
  };
}

export { botaoPadraoPulante, linkPadraoPulante };
