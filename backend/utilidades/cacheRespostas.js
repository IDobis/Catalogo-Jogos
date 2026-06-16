const entradas = new Map();

const TTL_PADRAO_MS = 10 * 60 * 1000;
const TTL_POPSCORE_PADRAO_MS = 60 * 60 * 1000;

function obterTtlCacheIgdb() {
  const ttl = Number.parseInt(process.env.CACHE_IGDB_TTL_MS ?? "", 10);
  return Number.isFinite(ttl) && ttl > 0 ? ttl : TTL_PADRAO_MS;
}

function obterTtlCachePopScore() {
  const ttl = Number.parseInt(process.env.CACHE_IGDB_POPSCORE_TTL_MS ?? "", 10);
  return Number.isFinite(ttl) && ttl > 0 ? ttl : TTL_POPSCORE_PADRAO_MS;
}

function cacheIgdbAtivo() {
  return process.env.CACHE_IGDB_ATIVO !== "false";
}

function montarChaveCache(url, consulta) {
  return `${url}\0${consulta}`;
}

function obterCacheResposta(chave) {
  const entrada = entradas.get(chave);

  if (!entrada) {
    return undefined;
  }

  if (Date.now() >= entrada.expiraEm) {
    entradas.delete(chave);
    return undefined;
  }

  return entrada.valor;
}

function armazenarCacheResposta(chave, valor, ttlMs = obterTtlCacheIgdb()) {
  entradas.set(chave, {
    valor,
    expiraEm: Date.now() + ttlMs,
  });
}

function limparCacheRespostas() {
  entradas.clear();
}

export {
  armazenarCacheResposta,
  cacheIgdbAtivo,
  limparCacheRespostas,
  montarChaveCache,
  obterCacheResposta,
  obterTtlCacheIgdb,
  obterTtlCachePopScore,
};
