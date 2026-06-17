import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import IconButtonPadraoPulante from "./IconButtonPadraoPulante";

const SCREENSHOTS_POR_PAGINA = 4;

function evitarScrollPorFoco(evento) {
  evento.preventDefault();
}

const estiloSetaNavegacaoBase = {
  zIndex: 2,
  color: "common.white",
  bgcolor: (theme) => alpha(theme.palette.common.black, 0.55),
  "&:hover": {
    bgcolor: (theme) => alpha(theme.palette.common.black, 0.75),
  },
  "&.Mui-disabled": {
    color: (theme) => alpha(theme.palette.common.white, 0.35),
    bgcolor: (theme) => alpha(theme.palette.common.black, 0.25),
  },
};

const estiloSetaNavegacao = {
  ...estiloSetaNavegacaoBase,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
};

const estiloSetaNavegacaoVertical = {
  ...estiloSetaNavegacaoBase,
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
};

const estiloSetaNavegacaoVerticalComHover = {
  ...estiloSetaNavegacaoVertical,
  "&:hover": {
    ...estiloSetaNavegacaoBase["&:hover"],
    transform: "translateX(-50%)",
  },
  "&:active": {
    transform: "translateX(-50%) scale(0.98)",
  },
};

function AreaPlayerTrailer({ trailers, indiceAtivo, aoAnterior, aoProximo }) {
  const trailerAtivo = trailers[indiceAtivo];
  const temAnterior = indiceAtivo > 0;
  const temProximo = indiceAtivo < trailers.length - 1;
  const exibirSetas = trailers.length > 1;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 1,
        overflow: "hidden",
        border: 1,
        borderColor: "divider",
        bgcolor: "grey.900",
      }}
    >
      <Box
        key={trailerAtivo.identificador}
        component="iframe"
        src={trailerAtivo.urlEmbed}
        title={trailerAtivo.titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />

      {exibirSetas && (
        <>
          <IconButtonPadraoPulante
            onClick={aoAnterior}
            disabled={!temAnterior}
            aria-label="Trailer anterior"
            size="small"
            sx={{ ...estiloSetaNavegacao, left: 8 }}
          >
            <ChevronLeftIcon />
          </IconButtonPadraoPulante>
          <IconButtonPadraoPulante
            onClick={aoProximo}
            disabled={!temProximo}
            aria-label="Próximo trailer"
            size="small"
            sx={{ ...estiloSetaNavegacao, right: 8 }}
          >
            <ChevronRightIcon />
          </IconButtonPadraoPulante>
        </>
      )}
    </Box>
  );
}

function LegendaTrailer({ trailers, indiceAtivo }) {
  const trailerAtivo = trailers[indiceAtivo];
  const exibirContador = trailers.length > 1;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mt={1}
      gap={1}
    >
      <Typography variant="body2" color="text.secondary" noWrap>
        {trailerAtivo.titulo}
      </Typography>
      {exibirContador && (
        <Typography variant="caption" color="text.secondary" flexShrink={0}>
          {indiceAtivo + 1} / {trailers.length}
        </Typography>
      )}
    </Stack>
  );
}

function PlayerTrailerComNavegacao({ trailers }) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);

  return (
    <Box>
      <AreaPlayerTrailer
        trailers={trailers}
        indiceAtivo={indiceAtivo}
        aoAnterior={() => setIndiceAtivo((indice) => Math.max(indice - 1, 0))}
        aoProximo={() =>
          setIndiceAtivo((indice) => Math.min(indice + 1, trailers.length - 1))
        }
      />
      <LegendaTrailer trailers={trailers} indiceAtivo={indiceAtivo} />
    </Box>
  );
}

function MiniaturaScreenshot({ screenshot, aoAbrir, preencherAltura = false }) {
  const [erroImagem, setErroImagem] = useState(false);

  const estiloBotao = {
    p: 0,
    border: 1,
    borderColor: "divider",
    borderRadius: 1,
    overflow: "hidden",
    cursor: erroImagem ? "default" : "pointer",
    bgcolor: erroImagem ? "grey.900" : "transparent",
    width: "100%",
    height: preencherAltura ? "100%" : "auto",
    transition: "border-color 0.2s ease",
    ...(!erroImagem && {
      "&:hover": {
        borderColor: "primary.main",
      },
    }),
  };

  if (erroImagem) {
    return (
      <Box
        component="div"
        aria-hidden
        sx={estiloBotao}
      />
    );
  }

  return (
    <Box
      component="button"
      type="button"
      onClick={() => aoAbrir(screenshot)}
      aria-label="Abrir screenshot em tamanho maior"
      sx={estiloBotao}
    >
      <Box
        component="img"
        src={screenshot.urlImagem}
        alt="Screenshot do jogo"
        loading={preencherAltura ? "eager" : "lazy"}
        decoding="async"
        onError={() => setErroImagem(true)}
        sx={{
          width: "100%",
          height: preencherAltura ? "100%" : "auto",
          aspectRatio: preencherAltura ? "auto" : "16 / 9",
          objectFit: "cover",
          display: "block",
        }}
      />
    </Box>
  );
}

function DialogScreenshotAmpliado({ screenshot, tituloJogo, aberto, aoFechar }) {
  return (
    <Dialog open={aberto} onClose={aoFechar} maxWidth="lg" fullWidth>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.5 }}
      >
        <Typography variant="subtitle1">Screenshot — {tituloJogo}</Typography>
        <IconButtonPadraoPulante
          onClick={aoFechar}
          aria-label="Fechar screenshot ampliado"
          size="small"
        >
          <CloseIcon />
        </IconButtonPadraoPulante>
      </Stack>
      <DialogContent sx={{ p: 2, pt: 0 }}>
        {screenshot && (
          <Box
            component="img"
            src={screenshot.urlImagem}
            alt={`Screenshot de ${tituloJogo}`}
            sx={{
              width: "100%",
              borderRadius: 1,
              display: "block",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function GradeScreenshots({ screenshots, tituloJogo }) {
  const [screenshotAmpliado, setScreenshotAmpliado] = useState(null);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={1.5}
      >
        {screenshots.map((screenshot) => (
          <MiniaturaScreenshot
            key={screenshot.identificador}
            screenshot={screenshot}
            aoAbrir={setScreenshotAmpliado}
          />
        ))}
      </Box>

      <DialogScreenshotAmpliado
        screenshot={screenshotAmpliado}
        tituloJogo={tituloJogo}
        aberto={Boolean(screenshotAmpliado)}
        aoFechar={() => setScreenshotAmpliado(null)}
      />
    </>
  );
}

function BlocoMidiaLadoALado({ trailers, screenshots, tituloJogo }) {
  const [indiceTrailer, setIndiceTrailer] = useState(0);
  const exibirPaginacaoScreenshots = screenshots.length > SCREENSHOTS_POR_PAGINA;

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "minmax(0, 1fr) 220px" }}
        gap={2}
        alignItems="stretch"
      >
        <Box minWidth={0}>
          <AreaPlayerTrailer
            trailers={trailers}
            indiceAtivo={indiceTrailer}
            aoAnterior={() =>
              setIndiceTrailer((indice) => Math.max(indice - 1, 0))
            }
            aoProximo={() =>
              setIndiceTrailer((indice) =>
                Math.min(indice + 1, trailers.length - 1)
              )
            }
          />
        </Box>
        <Box
          minWidth={0}
          sx={{ minHeight: 0, alignSelf: "stretch", pb: exibirPaginacaoScreenshots ? 2.5 : 0 }}
        >
          <ColunaScreenshots screenshots={screenshots} tituloJogo={tituloJogo} />
        </Box>
      </Box>
      <LegendaTrailer trailers={trailers} indiceAtivo={indiceTrailer} />
    </>
  );
}
function ColunaScreenshots({ screenshots, tituloJogo }) {
  const [screenshotAmpliado, setScreenshotAmpliado] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const scrollPreservado = useRef(null);

  const totalPaginas = Math.ceil(screenshots.length / SCREENSHOTS_POR_PAGINA);
  const exibirSetas = screenshots.length > SCREENSHOTS_POR_PAGINA;
  const temPaginaAnterior = paginaAtual > 0;
  const temProximaPagina = paginaAtual < totalPaginas - 1;

  const mudarPagina = useCallback((atualizador) => {
    scrollPreservado.current = window.scrollY;
    setPaginaAtual(atualizador);
  }, []);

  useLayoutEffect(() => {
    if (scrollPreservado.current === null) {
      return;
    }

    window.scrollTo(0, scrollPreservado.current);
    scrollPreservado.current = null;
  }, [paginaAtual]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowAnchor: "none",
        }}
      >
        {exibirSetas && (
          <IconButtonPadraoPulante
            onMouseDown={evitarScrollPorFoco}
            onClick={() => mudarPagina((pagina) => Math.max(pagina - 1, 0))}
            disabled={!temPaginaAnterior}
            aria-label="Screenshots anteriores"
            size="small"
            tabIndex={-1}
            deslocamentoHover={0}
            sx={{ ...estiloSetaNavegacaoVerticalComHover, top: 4 }}
          >
            <KeyboardArrowUpIcon />
          </IconButtonPadraoPulante>
        )}

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            position: "relative",
            overflow: "hidden",
            overflowAnchor: "none",
            py: exibirSetas ? 3.5 : 0,
          }}
        >
          {Array.from({ length: totalPaginas }, (_, pagina) => {
            const indiceInicial = pagina * SCREENSHOTS_POR_PAGINA;
            const screenshotsDaPagina = screenshots.slice(
              indiceInicial,
              indiceInicial + SCREENSHOTS_POR_PAGINA
            );
            const paginaVisivel = pagina === paginaAtual;

            return (
              <Box
                key={pagina}
                aria-hidden={!paginaVisivel}
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  opacity: paginaVisivel ? 1 : 0,
                  visibility: paginaVisivel ? "visible" : "hidden",
                  pointerEvents: paginaVisivel ? "auto" : "none",
                }}
              >
                {screenshotsDaPagina.map((screenshot) => (
                  <Box key={screenshot.identificador} sx={{ flex: 1, minHeight: 0 }}>
                    <MiniaturaScreenshot
                      screenshot={screenshot}
                      aoAbrir={setScreenshotAmpliado}
                      preencherAltura
                    />
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>

        {exibirSetas && (
          <IconButtonPadraoPulante
            onMouseDown={evitarScrollPorFoco}
            onClick={() =>
              mudarPagina((pagina) => Math.min(pagina + 1, totalPaginas - 1))
            }
            disabled={!temProximaPagina}
            aria-label="Próximos screenshots"
            size="small"
            tabIndex={-1}
            deslocamentoHover={0}
            sx={{ ...estiloSetaNavegacaoVerticalComHover, bottom: 4 }}
          >
            <KeyboardArrowDownIcon />
          </IconButtonPadraoPulante>
        )}

        {exibirSetas && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            {paginaAtual + 1} / {totalPaginas}
          </Typography>
        )}
      </Box>

      <DialogScreenshotAmpliado
        screenshot={screenshotAmpliado}
        tituloJogo={tituloJogo}
        aberto={Boolean(screenshotAmpliado)}
        aoFechar={() => setScreenshotAmpliado(null)}
      />
    </>
  );
}

function SecaoMidiaDetalheJogo({ trailers = [], screenshots = [], tituloJogo }) {
  const possuiTrailers = trailers.length > 0;
  const possuiScreenshots = screenshots.length > 0;

  if (!possuiTrailers && !possuiScreenshots) {
    return null;
  }

  const tituloSecao =
    possuiTrailers && possuiScreenshots
      ? "Trailers e screenshots"
      : possuiTrailers
        ? "Trailers"
        : "Screenshots";

  const layoutLadoALado = possuiTrailers && possuiScreenshots;

  return (
    <Box component="section" aria-label={tituloSecao} mt={4}>
      <Typography
        component="h2"
        variant="h5"
        gutterBottom
        sx={{ typography: { xs: "h6", sm: "h5" } }}
      >
        {tituloSecao}
      </Typography>

      {layoutLadoALado ? (
        <BlocoMidiaLadoALado
          trailers={trailers}
          screenshots={screenshots}
          tituloJogo={tituloJogo}
        />
      ) : (
        <Box>
          {possuiTrailers && <PlayerTrailerComNavegacao trailers={trailers} />}
          {possuiScreenshots && (
            <Box mt={possuiTrailers ? 3 : 0}>
              <GradeScreenshots
                screenshots={screenshots}
                tituloJogo={tituloJogo}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default SecaoMidiaDetalheJogo;
