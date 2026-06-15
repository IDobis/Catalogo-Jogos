import {
  ANOS_FILTRO,
  GENEROS_FILTRO,
  NOTAS_MINIMAS_FILTRO,
  PLATAFORMAS_FILTRO,
} from "../constantes/opcoesFiltroCatalogo.js";

const FILTROS_VAZIOS = {
  genero: "",
  plataforma: "",
  ano: "",
  notaMinima: "",
};

function valorPermitido(valor, opcoes) {
  if (!valor) {
    return "";
  }

  return opcoes.some((opcao) => opcao.valor === valor) ? valor : "";
}

function normalizarFiltrosConsulta(query) {
  return {
    genero: valorPermitido(query.genero, GENEROS_FILTRO),
    plataforma: valorPermitido(query.plataforma, PLATAFORMAS_FILTRO),
    ano: valorPermitido(query.ano, ANOS_FILTRO),
    notaMinima: valorPermitido(query.notaMinima, NOTAS_MINIMAS_FILTRO),
  };
}

function temFiltrosAtivos(filtros) {
  return Boolean(
    filtros.genero || filtros.plataforma || filtros.ano || filtros.notaMinima
  );
}

function montarClausulaWhere(filtros, { comBusca = false } = {}) {
  const partes = ["version_parent = null"];

  if (filtros.genero) {
    partes.push(`genres = (${filtros.genero})`);
  }

  if (filtros.plataforma) {
    partes.push(`platforms = (${filtros.plataforma})`);
  }

  if (filtros.ano) {
    const ano = Number.parseInt(filtros.ano, 10);
    const inicio = Math.floor(Date.UTC(ano, 0, 1) / 1000);
    const fim = Math.floor(Date.UTC(ano + 1, 0, 1) / 1000);
    partes.push(
      `first_release_date >= ${inicio} & first_release_date < ${fim}`
    );
  }

  if (filtros.notaMinima) {
    partes.push(`rating >= ${filtros.notaMinima}`);
  } else if (!comBusca && !temFiltrosAtivos(filtros)) {
    partes.push("rating > 70");
  }

  return partes.join(" & ");
}

export {
  FILTROS_VAZIOS,
  montarClausulaWhere,
  normalizarFiltrosConsulta,
  temFiltrosAtivos,
};
