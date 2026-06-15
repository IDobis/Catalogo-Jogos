const TAMANHO_CAPA_IGDB = "t_cover_big";

function montarUrlCapa(capa) {
  if (!capa?.image_id) {
    return null;
  }

  return `https://images.igdb.com/igdb/image/upload/${TAMANHO_CAPA_IGDB}/${capa.image_id}.webp`;
}

function extrairNomes(listaItens) {
  if (!Array.isArray(listaItens) || listaItens.length === 0) {
    return "—";
  }

  return listaItens.map((item) => item.name).join(", ");
}

function extrairAnoLancamento(timestamp) {
  if (!timestamp) {
    return null;
  }

  return new Date(timestamp * 1000).getFullYear();
}

function mapearJogoIgdb(jogoIgdb) {
  return {
    identificador: jogoIgdb.id,
    titulo: jogoIgdb.name ?? "Sem título",
    genero: extrairNomes(jogoIgdb.genres),
    plataforma: extrairNomes(jogoIgdb.platforms),
    urlImagemCapa: montarUrlCapa(jogoIgdb.cover),
    anoLancamento: extrairAnoLancamento(jogoIgdb.first_release_date),
    nota:
      typeof jogoIgdb.rating === "number"
        ? Math.round(jogoIgdb.rating)
        : null,
  };
}

function mapearListaJogosIgdb(listaJogosIgdb) {
  return listaJogosIgdb.map(mapearJogoIgdb);
}

function formatarDataLancamento(timestamp) {
  if (!timestamp) {
    return null;
  }

  return new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function extrairListaNomes(listaItens) {
  if (!Array.isArray(listaItens) || listaItens.length === 0) {
    return [];
  }

  return listaItens.map((item) => item.name);
}

function mapearJogoDetalheIgdb(jogoIgdb) {
  return {
    identificador: jogoIgdb.id,
    titulo: jogoIgdb.name ?? "Sem título",
    resumo: jogoIgdb.summary ?? null,
    generos: extrairListaNomes(jogoIgdb.genres),
    plataformas: extrairListaNomes(jogoIgdb.platforms),
    urlImagemCapa: montarUrlCapa(jogoIgdb.cover),
    dataLancamento: formatarDataLancamento(jogoIgdb.first_release_date),
    anoLancamento: extrairAnoLancamento(jogoIgdb.first_release_date),
    nota:
      typeof jogoIgdb.rating === "number"
        ? Math.round(jogoIgdb.rating)
        : null,
  };
}

export {
  mapearJogoDetalheIgdb,
  mapearJogoIgdb,
  mapearListaJogosIgdb,
};
