# Catálogo de Jogos Digitais

> Atualização

Projeto web para consulta de jogos digitais, desenvolvido com React e Material UI (MUI).

Para a API escolhi a IGDB da Twitch, pois é a mais completa.
Os dados são consumidos por um pequeno backend Node.js, que serve para proteger as credenciais OAuth da Twitch, sem ele não seria possível usar a API.

## Estrutura

```
Catalogo-Jogos/
├── backend/
│   ├── constantes/
│   ├── servicos/
│   │   ├── autenticacaoTwitch.js
│   │   ├── clienteIgdb.js
│   │   ├── consultaIgdb.js
│   │   └── consultaPopScoreIgdb.js
│   ├── rotas/
│   │   └── jogos.js
│   ├── utilidades/
│   │   ├── cacheRespostas.js
│   │   ├── mapearJogoIgdb.js
│   │   ├── montarFiltrosIgdb.js
│   │   └── ordenacaoIgdb.js
│   ├── servidor.js
│   ├── .env.example
│   └── package.json
├── public/
│   └── index.html
├── src/
│   ├── componentes/
│   ├── constantes/
│   ├── contextos/
│   ├── hooks/
│   ├── paginas/
│   ├── servicos/
│   ├── tema/
│   ├── App.jsx
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## Estado atual

- Listagem de jogos em grade responsiva (dados da IGDB)
- Busca por título em tempo real com debounce
- Backend Node.js com integração Twitch/IGDB
- Interface com React + MUI (temas escuro e agora claro também)
- Ordenação por nome, data de lançamento e popularidade (Popularidade foi alterado para o IGDB PopScore — Twitch Hours Watched, pois o por rating não fazia sentido.)
- Filtros por gênero, plataforma, ano e nota mínima
- Scroll infinito (carregando geralmente de 20 em 20) e skeleton loading nos cards
- Página de detalhes do jogo (`/jogo/:id`) com trailers (YouTube) e screenshots da IGDB
- Navbar com efeito glass e navegação entre Catálogo, Favoritos e Minha Lista
- Favoritos e CRUD manual de jogos persistidos no `localStorage`
- Exportação e importação de favoritos e minha lista em JSON
- Alternância entre tema escuro e claro (preferência salva no `localStorage`)
- Backend Node.js com integração Twitch/IGDB e cache de token OAuth
- Cache em memória das respostas da IGDB (TTL configurável via `CACHE_IGDB_TTL_MS`)
- Cache mais longo para PopScore (`CACHE_IGDB_POPSCORE_TTL_MS`, padrão 1 h) e pré-aquecimento do token Twitch ao iniciar o backend
- Carregamento inicial mais leve: rotas secundárias com `React.lazy`, cancelamento de requisições duplicadas (`AbortController`), capas visíveis com prioridade e `preconnect` às imagens da IGDB
- Testes básicos no frontend e backend (`npm run test:ci`)

## Futuras Ideias

- Traduzir a descrição dos jogos para português (pt-BR(Provavelmente será necessário o uso de outra API))
- Testes end-to-end para automatizar os testes (está ficando cansaivo avaliar coisa por coisa após uma leve mudança em como se comporta um efeito de abrir um modal)
- Otimizar layout para mobile (Arrumar o layout, está pútrido)
- Deploy do frontend e backend para ficar disponível ao público (Último)

## Necessário para Rodar o Projeto

Em uma máquina nova (com apenas o Vscode), instale antes de seguir o Como executar:

- **Git** — [git-scm.com/downloads](https://git-scm.com/downloads)
- **Node.js LTS** (18 ou superior) — [nodejs.org](https://nodejs.org/) (já inclui o `npm`)
- **Navegador** — Chrome, Firefox ou Edge

Clone o repositório:

```bash
git clone https://github.com/IDobis/Catalogo-Jogos.git
cd Catalogo-Jogos
```

### Credenciais Twitch

O backend consome a API IGDB via OAuth da Twitch. Sem **Client ID** e **Client Secret**, a listagem de jogos não funciona.

1. Crie um app em [dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps)
2. Em **OAuth Redirect URLs**, use `http://localhost:3000`
3. Preencha `TWITCH_CLIENT_ID` e `TWITCH_CLIENT_SECRET` no `backend/.env`

Em desenvolvimento, não é necessário criar `.env` na raiz do projeto — o proxy do `package.json` já aponta para o backend.

**Não é necessário:** banco de dados, Docker ou conta paga na Twitch.

## Como executar

```bash
# Backend — credenciais Twitch
cd backend
cp .env.example .env
npm install

# Frontend — na raiz do projeto
npm install

# Subir backend e frontend juntos
npm run dev
```

Também é possível rodar em terminais separados (`npm start` no `backend/` e na raiz).

O backend sobe em [http://localhost:3001](http://localhost:3001).
O aplicativo abre em [http://localhost:3000](http://localhost:3000).

## Fontes de Informações

- Formatação [Github](https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
- Ícones [MaterialUI](https://mui.com/material-ui/getting-started/usage/).
- API [IGDB](https://api-docs.igdb.com/#getting-started).
