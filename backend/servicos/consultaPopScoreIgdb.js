import {
  LIMITE_MAXIMO_PRIMITIVOS,
  TIPO_POPULARIDADE_TWITCH_HORAS_ASSISTIDAS,
  URL_IGDB_POPULARITY_PRIMITIVES,
} from "../constantes/popScoreIgdb.js";
import { executarConsultaIgdb } from "./clienteIgdb.js";

async function consultarIdsPopulares({ offset, limite }) {
  const consulta = [
    "fields game_id, value;",
    `where popularity_type = ${TIPO_POPULARIDADE_TWITCH_HORAS_ASSISTIDAS};`,
    "sort value desc;",
    `limit ${limite};`,
    `offset ${offset};`,
  ].join(" ");

  const primitivos = await executarConsultaIgdb(
    URL_IGDB_POPULARITY_PRIMITIVES,
    consulta
  );

  return primitivos.map((item) => item.game_id);
}

async function consultarPopScorePorIds(ids) {
  if (ids.length === 0) {
    return new Map();
  }

  const consulta = [
    "fields game_id, value;",
    `where game_id = (${ids.join(",")}) & popularity_type = ${TIPO_POPULARIDADE_TWITCH_HORAS_ASSISTIDAS};`,
    `limit ${ids.length};`,
  ].join(" ");

  const primitivos = await executarConsultaIgdb(
    URL_IGDB_POPULARITY_PRIMITIVES,
    consulta
  );

  return new Map(primitivos.map((item) => [item.game_id, item.value]));
}

async function consultarIdsPopularesParaFiltros() {
  return consultarIdsPopulares({
    offset: 0,
    limite: LIMITE_MAXIMO_PRIMITIVOS,
  });
}

export {
  consultarIdsPopulares,
  consultarIdsPopularesParaFiltros,
  consultarPopScorePorIds,
};
