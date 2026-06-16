import {
  ORDENACAO_PADRAO,
  obterClausulaOrdenacao,
  ordenarJogosBusca,
  ordenarJogosPorIds,
  ordenarJogosPorPopScore,
} from "../utilidades/ordenacaoIgdb.js";
import { montarClausulaWhere, temFiltrosAtivos } from "../utilidades/montarFiltrosIgdb.js";
import {
  consultarIdsPopulares,
  consultarIdsPopularesParaFiltros,
  consultarPopScorePorIds,
} from "./consultaPopScoreIgdb.js";
import { executarConsultaIgdb } from "./clienteIgdb.js";

const URL_IGDB_JOGOS = "https://api.igdb.com/v4/games";
const CAMPOS_JOGO =
  "name, cover.image_id, genres.name, platforms.name, first_release_date, rating";

function montarConsultaListagem({ ordenacao, offset, limite, filtros }) {
  const clausulaOrdenacao = obterClausulaOrdenacao(ordenacao);
  const clausulaWhere = montarClausulaWhere(filtros);

  return [
    `fields ${CAMPOS_JOGO};`,
    `where ${clausulaWhere};`,
    `sort ${clausulaOrdenacao};`,
    `limit ${limite};`,
    `offset ${offset};`,
  ].join(" ");
}

function montarConsultaBusca({ termoBusca, offset, limite, filtros }) {
  const termoSanitizado = termoBusca.replace(/"/g, '\\"');
  const clausulaWhere = montarClausulaWhere(filtros, { comBusca: true });

  return [
    `search "${termoSanitizado}";`,
    `fields ${CAMPOS_JOGO};`,
    `where ${clausulaWhere};`,
    `limit ${limite};`,
    `offset ${offset};`,
  ].join(" ");
}

function montarConsultaPorIds(ids, filtros) {
  const clausulaWhere = montarClausulaWhere(filtros);

  return [
    `fields ${CAMPOS_JOGO};`,
    `where id = (${ids.join(",")}) & ${clausulaWhere};`,
    `limit ${ids.length};`,
  ].join(" ");
}

async function consultarJogosPorIds(ids, filtros) {
  if (ids.length === 0) {
    return [];
  }

  const consulta = montarConsultaPorIds(ids, filtros);
  return executarConsultaIgdb(URL_IGDB_JOGOS, consulta);
}

async function consultarJogosPorPopularidade({
  offset,
  limite,
  filtros,
}) {
  if (temFiltrosAtivos(filtros)) {
    const idsPopulares = await consultarIdsPopularesParaFiltros();
    const jogos = await consultarJogosPorIds(idsPopulares, filtros);
    const jogosOrdenados = ordenarJogosPorIds(jogos, idsPopulares);

    return jogosOrdenados.slice(offset, offset + limite);
  }

  const idsPopulares = await consultarIdsPopulares({ offset, limite });

  if (idsPopulares.length === 0) {
    return [];
  }

  const jogos = await consultarJogosPorIds(idsPopulares, filtros);
  return ordenarJogosPorIds(jogos, idsPopulares);
}

async function consultarJogosIgdb({
  termoBusca,
  ordenacao = ORDENACAO_PADRAO,
  offset = 0,
  limite = 20,
  filtros = {},
}) {
  const termoNormalizado = termoBusca?.trim();

  if (!termoNormalizado && ordenacao === "popularidade") {
    return consultarJogosPorPopularidade({ offset, limite, filtros });
  }

  const consulta = termoNormalizado
    ? montarConsultaBusca({
        termoBusca: termoNormalizado,
        offset,
        limite,
        filtros,
      })
    : montarConsultaListagem({ ordenacao, offset, limite, filtros });

  const jogos = await executarConsultaIgdb(URL_IGDB_JOGOS, consulta);

  if (termoNormalizado && ordenacao === "popularidade") {
    const ids = jogos.map((jogo) => jogo.id);
    const pontuacoes = await consultarPopScorePorIds(ids);
    return ordenarJogosPorPopScore(jogos, pontuacoes);
  }

  if (termoNormalizado) {
    return ordenarJogosBusca(jogos, ordenacao);
  }

  return jogos;
}

const CAMPOS_JOGO_DETALHE =
  "name, summary, cover.image_id, genres.name, platforms.name, first_release_date, rating, screenshots.image_id, videos.video_id, videos.name";

function montarConsultaPorId(identificador) {
  return [
    `fields ${CAMPOS_JOGO_DETALHE};`,
    `where id = ${identificador};`,
  ].join(" ");
}

async function consultarJogoPorId(identificador) {
  const consulta = montarConsultaPorId(identificador);
  const jogos = await executarConsultaIgdb(URL_IGDB_JOGOS, consulta);
  return jogos[0] ?? null;
}

export { consultarJogoPorId, consultarJogosIgdb };
