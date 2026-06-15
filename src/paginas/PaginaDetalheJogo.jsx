import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import BotaoFavorito from "../componentes/BotaoFavorito";
import useJogoDetalhe from "../hooks/useJogoDetalhe";

function CapaDetalheJogo({ urlImagem, titulo }) {
  const [erroImagem, setErroImagem] = useState(false);
  const exibirPlaceholder = !urlImagem || erroImagem;

  if (exibirPlaceholder) {
    return (
      <Paper
        variant="outlined"
        sx={{
          aspectRatio: "3 / 4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.900",
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Capa indisponível
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      component="img"
      src={urlImagem}
      alt={`Capa do jogo ${titulo}`}
      onError={() => setErroImagem(true)}
      sx={{
        width: "100%",
        aspectRatio: "3 / 4",
        objectFit: "cover",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
      }}
    />
  );
}

function DetalheJogoSkeleton() {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "280px 1fr" }}
      gap={4}
      aria-busy="true"
      aria-label="Carregando detalhes do jogo"
    >
      <Skeleton variant="rectangular" sx={{ aspectRatio: "3 / 4" }} />
      <Box>
        <Skeleton variant="text" sx={{ fontSize: "2.5rem", mb: 2 }} />
        <Stack direction="row" spacing={1} mb={3}>
          <Skeleton variant="rounded" width={80} height={28} />
          <Skeleton variant="rounded" width={120} height={28} />
        </Stack>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </Box>
    </Box>
  );
}

function ListaChips({ rotulo, itens, cor = "default" }) {
  if (!itens.length) {
    return null;
  }

  return (
    <Box mb={2}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {rotulo}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {itens.map((item) => (
          <Chip key={item} label={item} size="small" color={cor} variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
}

function PaginaDetalheJogo({ identificador }) {
  const { jogo, carregando, mensagemErro, recarregar } =
    useJogoDetalhe(identificador);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Button
        component={RouterLink}
        to="/"
        variant="text"
        sx={{ mb: 3 }}
      >
        ← Voltar ao catálogo
      </Button>

      {mensagemErro && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            mensagemErro !== "Jogo não encontrado." ? (
              <Button color="inherit" size="small" onClick={recarregar}>
                Tentar novamente
              </Button>
            ) : (
              <Button
                color="inherit"
                size="small"
                component={RouterLink}
                to="/"
              >
                Ir ao catálogo
              </Button>
            )
          }
        >
          {mensagemErro}
        </Alert>
      )}

      {carregando ? (
        <DetalheJogoSkeleton />
      ) : (
        jogo && (
          <Box
            component="article"
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "280px 1fr" }}
            gap={4}
          >
            <CapaDetalheJogo
              urlImagem={jogo.urlImagemCapa}
              titulo={jogo.titulo}
            />

            <Box>
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                gap={2}
                mb={1}
              >
                <Typography component="h1" variant="h3" gutterBottom sx={{ mb: 0 }}>
                  {jogo.titulo}
                </Typography>
                <BotaoFavorito dadosJogo={jogo} tamanho="medium" />
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={3}>
                {jogo.nota != null && (
                  <Chip
                    label={`★ ${jogo.nota}`}
                    color="secondary"
                    variant="outlined"
                  />
                )}
                {jogo.dataLancamento && (
                  <Chip label={jogo.dataLancamento} variant="outlined" />
                )}
              </Stack>

              <ListaChips rotulo="Gêneros" itens={jogo.generos} />
              <ListaChips
                rotulo="Plataformas"
                itens={jogo.plataformas}
                cor="primary"
              />

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Sobre o jogo
              </Typography>
              <Typography
                component="p"
                variant="body1"
                color="text.secondary"
                sx={{ whiteSpace: "pre-line" }}
              >
                {jogo.resumo ?? "Descrição não disponível para este jogo."}
              </Typography>
            </Box>
          </Box>
        )
      )}
    </Container>
  );
}

export default PaginaDetalheJogo;
