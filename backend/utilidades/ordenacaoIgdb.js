const ORDENACOES_IGDB = {
  nome: "name asc",
  data: "first_release_date desc",
};

const ORDENACAO_PADRAO = "popularidade";
const LIMITE_PADRAO = 20;
const LIMITE_MAXIMO = 50;

const ORDENACOES_VALIDAS = ["popularidade", ...Object.keys(ORDENACOES_IGDB)];

function obterClausulaOrdenacao(ordenacao) {
  return ORDENACOES_IGDB[ordenacao] ?? ORDENACOES_IGDB.nome;
}

function normalizarPaginacao(offset, limite) {
  const offsetNormalizado = Math.max(Number.parseInt(offset, 10) || 0, 0);
  const limiteSolicitado = Number.parseInt(limite, 10) || LIMITE_PADRAO;
  const limiteNormalizado = Math.min(
    Math.max(limiteSolicitado, 1),
    LIMITE_MAXIMO
  );

  return { offset: offsetNormalizado, limite: limiteNormalizado };
}

function ordenacaoValida(ordenacao) {
  return ORDENACOES_VALIDAS.includes(ordenacao);
}

function ordenarJogosPorIds(jogos, idsOrdenados) {
  const indice = new Map(idsOrdenados.map((id, posicao) => [id, posicao]));

  return [...jogos].sort(
    (a, b) => (indice.get(a.id) ?? Infinity) - (indice.get(b.id) ?? Infinity)
  );
}

function ordenarJogosPorPopScore(jogos, pontuacoes) {
  return [...jogos].sort((a, b) => {
    const valorA = pontuacoes.get(a.id) ?? -1;
    const valorB = pontuacoes.get(b.id) ?? -1;
    return valorB - valorA;
  });
}

function ordenarJogosBusca(jogos, ordenacao) {
  if (ordenacao === "popularidade") {
    return jogos;
  }

  const copia = [...jogos];

  if (ordenacao === "nome") {
    return copia.sort((a, b) =>
      (a.name ?? "").localeCompare(b.name ?? "", "pt-BR", {
        sensitivity: "base",
      })
    );
  }

  if (ordenacao === "data") {
    return copia.sort(
      (a, b) => (b.first_release_date ?? 0) - (a.first_release_date ?? 0)
    );
  }

  return copia;
}

export {
  LIMITE_PADRAO,
  ORDENACAO_PADRAO,
  normalizarPaginacao,
  obterClausulaOrdenacao,
  ordenacaoValida,
  ordenarJogosBusca,
  ordenarJogosPorIds,
  ordenarJogosPorPopScore,
};
