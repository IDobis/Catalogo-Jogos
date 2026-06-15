# Catálogo de Jogos Digitais

> Atualização

Projeto web para consulta de jogos digitais, desenvolvido com React e Material UI (MUI).

Para a API escolhi a IGDB da Twitch, pois é a mais completa.
A API está sendo estudada por agora, pois ela tem a necessidade de no mínimo um mini Backend.

## Estrutura

```
Catalogo-Jogos/
├── public/
│   └── index.html
├── src/
│   ├── componentes/
│   │   ├── CabecalhoCatalogo.jsx
│   │   ├── CartaoJogo.jsx
│   │   └── SecaoCatalogo.jsx
│   ├── dados/
│   │   └── listaDeJogos.js
│   ├── utilidades/
│   │   └── formatarPreco.js
│   ├── App.jsx
│   └── index.js
└── package.json
```

## Como executar

```bash
npm install
npm start
```

O aplicativo abre em [http://localhost:3000](http://localhost:3000).

## Estado atual

- Listagem de jogos em grade responsiva
- Busca por título em tempo real
- Imagens por URL (dados estáticos)
- Interface com React + MUI (tema escuro)

## Fontes de Informações

- Formatação [Github](https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
- Ícones [MaterialUI](https://mui.com/material-ui/getting-started/usage/).
- API [IGDB](https://api-docs.igdb.com/#getting-started).
