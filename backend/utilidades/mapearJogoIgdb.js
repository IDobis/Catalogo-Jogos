const TAMANHO_CAPA_IGDB = "t_cover_big";
const TAMANHO_SCREENSHOT_IGDB = "t_screenshot_huge";
const LIMITE_SCREENSHOTS_DETALHE = 12;

function montarUrlCapa(capa) {
  if (!capa?.image_id) {
    return null;
  }

  return `https://images.igdb.com/igdb/image/upload/${TAMANHO_CAPA_IGDB}/${capa.image_id}.webp`;
}

function montarUrlScreenshot(imageId) {
  if (!imageId) {
    return null;
  }

  return `https://images.igdb.com/igdb/image/upload/${TAMANHO_SCREENSHOT_IGDB}/${imageId}.webp`;
}

function montarUrlEmbedYoutube(videoId) {
  if (!videoId) {
    return null;
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

function mapearTrailers(videos) {
  if (!Array.isArray(videos) || videos.length === 0) {
    return [];
  }

  return videos
    .filter((video) => video?.video_id)
    .map((video) => ({
      identificador: video.video_id,
      titulo: video.name?.trim() || "Trailer",
      urlEmbed: montarUrlEmbedYoutube(video.video_id),
    }));
}

function mapearScreenshots(screenshots) {
  if (!Array.isArray(screenshots) || screenshots.length === 0) {
    return [];
  }

  return screenshots
    .filter((screenshot) => screenshot?.image_id)
    .slice(0, LIMITE_SCREENSHOTS_DETALHE)
    .map((screenshot) => ({
      identificador: screenshot.image_id,
      urlImagem: montarUrlScreenshot(screenshot.image_id),
    }));
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
    trailers: mapearTrailers(jogoIgdb.videos),
    screenshots: mapearScreenshots(jogoIgdb.screenshots),
  };
}

export {
  mapearJogoDetalheIgdb,
  mapearJogoIgdb,
  mapearListaJogosIgdb,
};
