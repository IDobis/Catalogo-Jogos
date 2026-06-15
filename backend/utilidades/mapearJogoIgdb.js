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

function mapearJogoIgdb(jogoIgdb) {
  return {
    identificador: jogoIgdb.id,
    titulo: jogoIgdb.name ?? "Sem título",
    genero: extrairNomes(jogoIgdb.genres),
    plataforma: extrairNomes(jogoIgdb.platforms),
    urlImagemCapa: montarUrlCapa(jogoIgdb.cover),
  };
}

function mapearListaJogosIgdb(listaJogosIgdb) {
  return listaJogosIgdb.map(mapearJogoIgdb);
}

export { mapearJogoIgdb, mapearListaJogosIgdb };
