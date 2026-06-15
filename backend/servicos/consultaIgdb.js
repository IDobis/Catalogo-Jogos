import { obterCredenciais, obterTokenAcesso } from "./autenticacaoTwitch.js";

const URL_IGDB_JOGOS = "https://api.igdb.com/v4/games";

function montarConsultaListagem() {
  return [
    "fields name, cover.image_id, genres.name, platforms.name;",
    "where version_parent = null & rating > 70;",
    "sort rating desc;",
    "limit 20;",
  ].join(" ");
}

function montarConsultaBusca(termoBusca) {
  const termoSanitizado = termoBusca.replace(/"/g, '\\"');

  return [
    `search "${termoSanitizado}";`,
    "fields name, cover.image_id, genres.name, platforms.name;",
    "where version_parent = null;",
    "limit 20;",
  ].join(" ");
}

async function consultarJogosIgdb(termoBusca) {
  const tokenAcesso = await obterTokenAcesso();
  const { clientId } = obterCredenciais();
  const consulta = termoBusca?.trim()
    ? montarConsultaBusca(termoBusca.trim())
    : montarConsultaListagem();

  const resposta = await fetch(URL_IGDB_JOGOS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": clientId,
      Authorization: `Bearer ${tokenAcesso}`,
    },
    body: consulta,
  });

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`Falha na consulta IGDB (${resposta.status}): ${detalhe}`);
  }

  return resposta.json();
}

export { consultarJogosIgdb };
