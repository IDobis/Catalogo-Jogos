import { VERSAO_EXPORTACAO } from "../constantes/armazenamentoPessoal";

function sanitizarJogoFavorito(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const identificador = item.identificador;

  if (typeof identificador !== "number" || !Number.isInteger(identificador) || identificador <= 0) {
    return null;
  }

  if (typeof item.titulo !== "string" || !item.titulo.trim()) {
    return null;
  }

  return {
    identificador,
    titulo: item.titulo.trim(),
    genero: typeof item.genero === "string" && item.genero.trim() ? item.genero.trim() : "—",
    plataforma:
      typeof item.plataforma === "string" && item.plataforma.trim()
        ? item.plataforma.trim()
        : "—",
    urlImagemCapa:
      typeof item.urlImagemCapa === "string" && item.urlImagemCapa.trim()
        ? item.urlImagemCapa.trim()
        : null,
    anoLancamento:
      typeof item.anoLancamento === "number" && Number.isInteger(item.anoLancamento)
        ? item.anoLancamento
        : null,
    nota:
      typeof item.nota === "number" && Number.isInteger(item.nota) ? item.nota : null,
    origem: "favorito",
  };
}

function gerarIdentificadorLocal() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function sanitizarJogoLocal(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  if (typeof item.titulo !== "string" || !item.titulo.trim()) {
    return null;
  }

  const identificador =
    typeof item.identificador === "string" && item.identificador.startsWith("local-")
      ? item.identificador
      : gerarIdentificadorLocal();

  return {
    identificador,
    titulo: item.titulo.trim(),
    genero: typeof item.genero === "string" && item.genero.trim() ? item.genero.trim() : "—",
    plataforma:
      typeof item.plataforma === "string" && item.plataforma.trim()
        ? item.plataforma.trim()
        : "—",
    urlImagemCapa:
      typeof item.urlImagemCapa === "string" && item.urlImagemCapa.trim()
        ? item.urlImagemCapa.trim()
        : null,
    anoLancamento:
      typeof item.anoLancamento === "number" && Number.isInteger(item.anoLancamento)
        ? item.anoLancamento
        : null,
    nota:
      typeof item.nota === "number" && Number.isInteger(item.nota) ? item.nota : null,
    origem: "local",
  };
}

function sanitizarLista(itens, sanitizarItem) {
  if (!Array.isArray(itens)) {
    return [];
  }

  const itensValidos = [];

  for (const item of itens) {
    const itemSanitizado = sanitizarItem(item);

    if (itemSanitizado) {
      itensValidos.push(itemSanitizado);
    }
  }

  return itensValidos;
}

function montarDadosExportacao(favoritos, minhaLista) {
  return {
    versao: VERSAO_EXPORTACAO,
    exportadoEm: new Date().toISOString(),
    favoritos: sanitizarLista(favoritos, sanitizarJogoFavorito),
    minhaLista: sanitizarLista(minhaLista, sanitizarJogoLocal),
  };
}

function serializarDadosExportacao(dados) {
  return JSON.stringify(dados, null, 2);
}

function montarNomeArquivoExportacao(data = new Date()) {
  const dataFormatada = data.toISOString().slice(0, 10);
  return `catalogo-jogos-backup-${dataFormatada}.json`;
}

function parsearArquivoImportacao(conteudo) {
  let dados;

  try {
    dados = JSON.parse(conteudo);
  } catch {
    return { sucesso: false, mensagem: "O arquivo não contém um JSON válido." };
  }

  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    return { sucesso: false, mensagem: "O formato do arquivo é inválido." };
  }

  const favoritos = sanitizarLista(dados.favoritos, sanitizarJogoFavorito);
  const minhaLista = sanitizarLista(dados.minhaLista, sanitizarJogoLocal);

  if (favoritos.length === 0 && minhaLista.length === 0) {
    return {
      sucesso: false,
      mensagem: "O arquivo não contém favoritos nem jogos da minha lista válidos.",
    };
  }

  return {
    sucesso: true,
    dados: { favoritos, minhaLista },
    resumo: {
      quantidadeFavoritos: favoritos.length,
      quantidadeMinhaLista: minhaLista.length,
    },
  };
}

function mesclarListaPorIdentificador(listaAtual, listaImportada) {
  const mapa = new Map(listaAtual.map((item) => [item.identificador, item]));

  for (const item of listaImportada) {
    mapa.set(item.identificador, item);
  }

  return Array.from(mapa.values());
}

function aplicarImportacao(favoritosAtuais, minhaListaAtual, dadosImportados, modo) {
  if (modo === "substituir") {
    return {
      favoritos: dadosImportados.favoritos,
      minhaLista: dadosImportados.minhaLista,
    };
  }

  return {
    favoritos: mesclarListaPorIdentificador(
      favoritosAtuais,
      dadosImportados.favoritos
    ),
    minhaLista: mesclarListaPorIdentificador(
      minhaListaAtual,
      dadosImportados.minhaLista
    ),
  };
}

export {
  aplicarImportacao,
  montarDadosExportacao,
  montarNomeArquivoExportacao,
  parsearArquivoImportacao,
  sanitizarJogoFavorito,
  sanitizarJogoLocal,
  serializarDadosExportacao,
};
