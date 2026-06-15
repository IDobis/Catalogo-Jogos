const ANO_INICIAL = 1990;

function gerarOpcoesAnos() {
  const anoAtual = new Date().getFullYear();
  const opcoes = [{ valor: "", rotulo: "Qualquer ano" }];

  for (let ano = anoAtual; ano >= ANO_INICIAL; ano -= 1) {
    opcoes.push({ valor: String(ano), rotulo: String(ano) });
  }

  return opcoes;
}

const FILTROS_INICIAIS = {
  genero: "",
  plataforma: "",
  ano: "",
  notaMinima: "",
};

const OPCOES_FILTRO_CATALOGO = {
  generos: [
    { valor: "", rotulo: "Todos os gêneros" },
    { valor: "4", rotulo: "Luta" },
    { valor: "5", rotulo: "Tiro" },
    { valor: "8", rotulo: "Plataforma" },
    { valor: "9", rotulo: "Quebra-cabeça" },
    { valor: "10", rotulo: "Corrida" },
    { valor: "12", rotulo: "RPG" },
    { valor: "13", rotulo: "Simulação" },
    { valor: "15", rotulo: "Estratégia" },
    { valor: "25", rotulo: "Hack and slash" },
    { valor: "31", rotulo: "Aventura" },
    { valor: "32", rotulo: "Indie" },
    { valor: "33", rotulo: "Arcade" },
  ],
  plataformas: [
    { valor: "", rotulo: "Todas as plataformas" },
    { valor: "3", rotulo: "Linux" },
    { valor: "6", rotulo: "PC (Windows)" },
    { valor: "14", rotulo: "Mac" },
    { valor: "48", rotulo: "PlayStation 4" },
    { valor: "49", rotulo: "Xbox One" },
    { valor: "130", rotulo: "Nintendo Switch" },
    { valor: "167", rotulo: "PlayStation 5" },
    { valor: "169", rotulo: "Xbox Series X|S" },
  ],
  anos: gerarOpcoesAnos(),
  notasMinimas: [
    { valor: "", rotulo: "Qualquer nota" },
    { valor: "70", rotulo: "70+" },
    { valor: "80", rotulo: "80+" },
    { valor: "90", rotulo: "90+" },
  ],
};

function temFiltrosAtivos(filtros) {
  return Boolean(
    filtros.genero || filtros.plataforma || filtros.ano || filtros.notaMinima
  );
}

function contarFiltrosAtivos(filtros) {
  return [filtros.genero, filtros.plataforma, filtros.ano, filtros.notaMinima].filter(
    Boolean
  ).length;
}

export { FILTROS_INICIAIS, OPCOES_FILTRO_CATALOGO, contarFiltrosAtivos, temFiltrosAtivos };
