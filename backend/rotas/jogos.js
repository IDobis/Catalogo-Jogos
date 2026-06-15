import { Router } from "express";
import {
  consultarJogoPorId,
  consultarJogosIgdb,
} from "../servicos/consultaIgdb.js";
import {
  mapearJogoDetalheIgdb,
  mapearListaJogosIgdb,
} from "../utilidades/mapearJogoIgdb.js";
import {
  ORDENACAO_PADRAO,
  normalizarPaginacao,
  ordenacaoValida,
} from "../utilidades/ordenacaoIgdb.js";
import { normalizarFiltrosConsulta } from "../utilidades/montarFiltrosIgdb.js";
import { OPCOES_FILTRO_CATALOGO } from "../constantes/opcoesFiltroCatalogo.js";

const rotaJogos = Router();

rotaJogos.get("/", async (req, res) => {
  try {
    const termoBusca = req.query.busca;
    const ordenacaoSolicitada = req.query.ordenar ?? ORDENACAO_PADRAO;
    const ordenacao = ordenacaoValida(ordenacaoSolicitada)
      ? ordenacaoSolicitada
      : ORDENACAO_PADRAO;
    const { offset, limite } = normalizarPaginacao(
      req.query.offset,
      req.query.limite
    );
    const filtros = normalizarFiltrosConsulta(req.query);

    const jogosIgdb = await consultarJogosIgdb({
      termoBusca,
      ordenacao,
      offset,
      limite,
      filtros,
    });
    const jogos = mapearListaJogosIgdb(jogosIgdb);

    res.json({
      jogos,
      temMais: jogos.length === limite,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Não foi possível consultar os jogos no momento.",
    });
  }
});

rotaJogos.get("/opcoes-filtro", (_req, res) => {
  res.json(OPCOES_FILTRO_CATALOGO);
});

rotaJogos.get("/:id", async (req, res) => {
  try {
    const identificador = Number.parseInt(req.params.id, 10);

    if (!Number.isInteger(identificador) || identificador <= 0) {
      return res.status(400).json({ mensagem: "ID de jogo inválido." });
    }

    const jogoIgdb = await consultarJogoPorId(identificador);

    if (!jogoIgdb) {
      return res.status(404).json({ mensagem: "Jogo não encontrado." });
    }

    res.json(mapearJogoDetalheIgdb(jogoIgdb));
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Não foi possível consultar o jogo no momento.",
    });
  }
});

export default rotaJogos;
