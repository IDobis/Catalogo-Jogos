import {
  invalidarToken,
  obterCredenciais,
  obterTokenAcesso,
} from "./autenticacaoTwitch.js";
import { URL_IGDB_POPULARITY_PRIMITIVES } from "../constantes/popScoreIgdb.js";
import {
  armazenarCacheResposta,
  cacheIgdbAtivo,
  montarChaveCache,
  obterCacheResposta,
  obterTtlCacheIgdb,
  obterTtlCachePopScore,
} from "../utilidades/cacheRespostas.js";

function obterTtlParaUrl(url) {
  return url === URL_IGDB_POPULARITY_PRIMITIVES
    ? obterTtlCachePopScore()
    : obterTtlCacheIgdb();
}

async function executarConsultaIgdb(url, consulta, tentativa = 0) {
  const chaveCache = montarChaveCache(url, consulta);

  if (cacheIgdbAtivo() && tentativa === 0) {
    const respostaEmCache = obterCacheResposta(chaveCache);

    if (respostaEmCache !== undefined) {
      return respostaEmCache;
    }
  }

  const tokenAcesso = await obterTokenAcesso();
  const { clientId } = obterCredenciais();

  const resposta = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": clientId,
      Authorization: `Bearer ${tokenAcesso}`,
    },
    body: consulta,
  });

  if (resposta.status === 401 && tentativa === 0) {
    invalidarToken();
    return executarConsultaIgdb(url, consulta, 1);
  }

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`Falha na consulta IGDB (${resposta.status}): ${detalhe}`);
  }

  const dados = await resposta.json();

  if (cacheIgdbAtivo() && tentativa === 0) {
    armazenarCacheResposta(chaveCache, dados, obterTtlParaUrl(url));
  }

  return dados;
}

export { executarConsultaIgdb };
