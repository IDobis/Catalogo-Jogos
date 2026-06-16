import { LIMITE_POR_PAGINA } from "../constantes/ordenacaoCatalogo";

const URL_BASE_API = (process.env.REACT_APP_API_URL ?? "").replace(/\/$/, "");

function montarUrlApi(caminho) {
  return `${URL_BASE_API}${caminho}`;
}

function adicionarFiltrosAosParametros(parametros, filtros) {
  if (filtros?.genero) {
    parametros.set("genero", filtros.genero);
  }

  if (filtros?.plataforma) {
    parametros.set("plataforma", filtros.plataforma);
  }

  if (filtros?.ano) {
    parametros.set("ano", filtros.ano);
  }

  if (filtros?.notaMinima) {
    parametros.set("notaMinima", filtros.notaMinima);
  }
}

async function buscarJogos({
  termoBusca,
  ordenacao,
  offset = 0,
  limite = LIMITE_POR_PAGINA,
  filtros = {},
  signal,
}) {
  const parametros = new URLSearchParams({
    ordenar: ordenacao,
    offset: String(offset),
    limite: String(limite),
  });

  if (termoBusca?.trim()) {
    parametros.set("busca", termoBusca.trim());
  }

  adicionarFiltrosAosParametros(parametros, filtros);

  const resposta = await fetch(
    montarUrlApi(`/api/jogos?${parametros.toString()}`),
    { signal }
  );

  if (!resposta.ok) {
    throw new Error("Falha ao buscar jogos na API.");
  }

  return resposta.json();
}

async function buscarJogoPorId(identificador) {
  const resposta = await fetch(montarUrlApi(`/api/jogos/${identificador}`));

  if (resposta.status === 404) {
    throw new Error("Jogo não encontrado.");
  }

  if (!resposta.ok) {
    throw new Error("Falha ao buscar detalhes do jogo.");
  }

  return resposta.json();
}

export { buscarJogoPorId };
export default buscarJogos;
