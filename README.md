# Catálogo de Jogos Digitais

> Atualização

Projeto web para consulta de jogos digitais, desenvolvido com React e Material UI (MUI).

Para a API escolhi a IGDB da Twitch, pois é a mais completa.
Os dados são consumidos por um pequeno backend Node.js, que serve para proteger as credenciais OAuth da Twitch, sem ele não seria possível usar a API.

## Estrutura

```
Catalogo-Jogos/
├── backend/
│   ├── servicos/
│   │   ├── autenticacaoTwitch.js
│   │   └── consultaIgdb.js
│   ├── rotas/
│   │   └── jogos.js
│   ├── utilidades/
│   │   └── mapearJogoIgdb.js
│   ├── servidor.js
│   ├── .env.example
│   └── package.json
├── public/
│   └── index.html
├── src/
│   ├── componentes/
│   │   ├── CabecalhoCatalogo.jsx
│   │   ├── CartaoJogo.jsx
│   │   └── SecaoCatalogo.jsx
│   ├── hooks/
│   │   └── useCatalogoJogos.js
│   ├── servicos/
│   │   └── apiCatalogo.js
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## Como executar

```bash
# Terminal 1 — backend
cd backend
cp .env.example .env
npm install
npm start

# Terminal 2 — frontend
npm install
npm start
```

O backend sobe em [http://localhost:3001](http://localhost:3001).
O aplicativo abre em [http://localhost:3000](http://localhost:3000).

## Estado atual

- Listagem de jogos em grade responsiva (dados da IGDB)
- Busca por título em tempo real com debounce
- Backend Node.js com integração Twitch/IGDB
- Interface com React + MUI (tema escuro)

## Futuro
- Adição de um Página contendo informações sobre o Jogo
- Ordenar melhor a Página Inicial
- Adicionar sistema CRUD usando uma navbar ( Com uso do LocalStorage )
- Adicionar pesquisa por filtros
- Adicionar modo claro

## Fontes de Informações

- Formatação [Github](https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
- Ícones [MaterialUI](https://mui.com/material-ui/getting-started/usage/).
- API [IGDB](https://api-docs.igdb.com/#getting-started).
