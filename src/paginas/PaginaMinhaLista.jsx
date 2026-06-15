import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import CartaoJogo from "../componentes/CartaoJogo";
import DialogConfirmarExclusao from "../componentes/DialogConfirmarExclusao";
import FormularioJogoLocal from "../componentes/FormularioJogoLocal";
import { useArmazenamentoPessoal } from "../contextos/ArmazenamentoPessoalContext";
import { ESTILO_GRADE_CATALOGO } from "../constantes/layoutCatalogo";

function PaginaMinhaLista() {
  const {
    jogosLocais,
    adicionarJogoLocal,
    atualizarJogoLocal,
    removerJogoLocal,
  } = useArmazenamentoPessoal();
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [jogoEmEdicao, setJogoEmEdicao] = useState(null);
  const [jogoParaExcluir, setJogoParaExcluir] = useState(null);

  function abrirNovoJogo() {
    setJogoEmEdicao(null);
    setFormularioAberto(true);
  }

  function abrirEdicao(jogo) {
    setJogoEmEdicao(jogo);
    setFormularioAberto(true);
  }

  function fecharFormulario() {
    setFormularioAberto(false);
    setJogoEmEdicao(null);
  }

  function aoSalvar(dados) {
    if (jogoEmEdicao) {
      atualizarJogoLocal(jogoEmEdicao.identificador, dados);
      return;
    }

    adicionarJogoLocal(dados);
  }

  async function confirmarExclusao() {
    if (!jogoParaExcluir) {
      return;
    }

    await new Promise((resolver) => setTimeout(resolver, 350));
    removerJogoLocal(jogoParaExcluir.identificador);
    setJogoParaExcluir(null);
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        gap={2}
        mb={4}
      >
        <Box>
          <Typography component="h1" variant="h4" gutterBottom>
            Minha Lista
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Jogos adicionados manualmente, salvos no seu navegador.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={abrirNovoJogo}
          sx={{ alignSelf: { sm: "center" } }}
        >
          Adicionar jogo
        </Button>
      </Box>

      {jogosLocais.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            py: 6,
            px: 3,
            textAlign: "center",
            borderStyle: "dashed",
          }}
        >
          <Typography color="text.secondary" mb={2}>
            Sua lista pessoal está vazia. Adicione jogos que não estão no
            catálogo da IGDB.
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={abrirNovoJogo}>
            Adicionar primeiro jogo
          </Button>
        </Paper>
      ) : (
        <Box
          sx={ESTILO_GRADE_CATALOGO}
          role="list"
          aria-label="Jogos da lista pessoal"
        >
          {jogosLocais.map((dadosJogo) => (
            <Box key={dadosJogo.identificador} role="listitem">
              <CartaoJogo
                dadosJogo={dadosJogo}
                origem="local"
                exibirFavorito={false}
                aoEditar={abrirEdicao}
                aoExcluir={setJogoParaExcluir}
              />
            </Box>
          ))}
        </Box>
      )}

      <FormularioJogoLocal
        aberto={formularioAberto}
        aoFechar={fecharFormulario}
        aoSalvar={aoSalvar}
        jogoEmEdicao={jogoEmEdicao}
      />

      <DialogConfirmarExclusao
        aberto={Boolean(jogoParaExcluir)}
        tituloJogo={jogoParaExcluir?.titulo}
        aoCancelar={() => setJogoParaExcluir(null)}
        aoConfirmar={confirmarExclusao}
      />
    </Container>
  );
}

export default PaginaMinhaLista;
