const listaDeJogos = [
  {
    identificador: 1,
    titulo: "The Witcher 3",
    genero: "RPG",
    plataforma: "PC",
    preco: 79.9,
    urlImagemCapa:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp",
  },
  {
    identificador: 2,
    titulo: "Hollow Knight",
    genero: "Metroidvania",
    plataforma: "PC",
    preco: 46.99,
    urlImagemCapa:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co93cr.webp",
  },
  {
    identificador: 3,
    titulo: "Celeste",
    genero: "Plataforma",
    plataforma: "PC",
    preco: 37.99,
    urlImagemCapa:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co6pib.webp",
  },
  {
    identificador: 4,
    titulo: "Stardew Valley",
    genero: "Simulação",
    plataforma: "PC",
    preco: 32.99,
    urlImagemCapa:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co3nbc.webp",
  },
  {
    identificador: 5,
    titulo: "Hades",
    genero: "Roguelike",
    plataforma: "PC",
    preco: 49.99,
    urlImagemCapa:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2iym.webp",
  },
  {
    identificador: 6,
    titulo: "Portal 2",
    genero: "Puzzle",
    plataforma: "PC",
    preco: 24.99,
    urlImagemCapa:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rs4.webp",
  },
];

const elementoGradeCatalogo = document.getElementById("gradeCatalogo");
const elementoMensagemCatalogoVazio = document.getElementById(
  "mensagemCatalogoVazio"
);
const elementoCampoBuscaPorTitulo = document.getElementById(
  "campoBuscaPorTitulo"
);

function formatarPreco(valorPreco) {
  return valorPreco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

class CartaoJogo {
  constructor(dadosJogo) {
    this.dadosJogo = dadosJogo;
  }

  criarElemento() {
    const artigo = document.createElement("article");
    artigo.className = "CartaoJogo";
    artigo.setAttribute("role", "listitem");
    artigo.setAttribute(
      "aria-label",
      `Jogo ${this.dadosJogo.titulo}, gênero ${this.dadosJogo.genero}, plataforma ${this.dadosJogo.plataforma}`
    );

    artigo.innerHTML = `
      <figure class="FiguraCapaJogo">
        <img
          class="ImagemCapaJogo"
          src="${this.dadosJogo.urlImagemCapa}"
          alt="Capa do jogo ${this.dadosJogo.titulo}"
          loading="lazy"
          width="220"
          height="293"
        />
      </figure>

      <div class="CorpoCartaoJogo">
        <h3 class="TituloJogo">${this.dadosJogo.titulo}</h3>

        <dl class="ListaInformacoesJogo">
          <div class="ItemInformacaoJogo">
            <dt class="RotuloInformacao">Gênero</dt>
            <dd class="ValorInformacao ValorInformacao--Genero">${this.dadosJogo.genero}</dd>
          </div>
          <div class="ItemInformacaoJogo">
            <dt class="RotuloInformacao">Plataforma</dt>
            <dd class="ValorInformacao ValorInformacao--Plataforma">${this.dadosJogo.plataforma}</dd>
          </div>
        </dl>

        <p class="PrecoJogo">
          <span class="RotuloPreco">Preço</span>
          <data class="ValorPreco" value="${this.dadosJogo.preco}">
            ${formatarPreco(this.dadosJogo.preco)}
          </data>
        </p>
      </div>
    `;

    return artigo;
  }
}

function renderizarJogos(listaJogosFiltrados) {
  elementoGradeCatalogo.replaceChildren();

  if (listaJogosFiltrados.length === 0) {
    elementoMensagemCatalogoVazio.hidden = false;
    return;
  }

  elementoMensagemCatalogoVazio.hidden = true;

  listaJogosFiltrados.forEach((dadosJogo) => {
    const cartaoJogo = new CartaoJogo(dadosJogo);
    elementoGradeCatalogo.appendChild(cartaoJogo.criarElemento());
  });
}

function filtrarJogosPorTitulo(textoBusca) {
  const termoBusca = textoBusca.trim().toLowerCase();

  return listaDeJogos.filter((dadosJogo) =>
    dadosJogo.titulo.toLowerCase().includes(termoBusca)
  );
}

function inicializarCatalogo() {
  renderizarJogos(listaDeJogos);

  elementoCampoBuscaPorTitulo.addEventListener("input", (evento) => {
    const jogosFiltrados = filtrarJogosPorTitulo(evento.target.value);
    renderizarJogos(jogosFiltrados);
  });
}

inicializarCatalogo();
