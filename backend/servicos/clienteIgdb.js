import {
  invalidarToken,
  obterCredenciais,
  obterTokenAcesso,
} from "./autenticacaoTwitch.js";

async function executarConsultaIgdb(url, consulta, tentativa = 0) {
  const tokenAcesso = await obterTokenAcesso();
  const { clientId } = obterCredenciais();

  const resposta = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": clientId,
      Authorization: `Bearer ${tokenAcesso}`,
    },
    body: consulta,
  });

  if (resposta.status === 401 && tentativa === 0) {
    invalidarToken();
    return executarConsultaIgdb(url, consulta, 1);
  }

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`Falha na consulta IGDB (${resposta.status}): ${detalhe}`);
  }

  return resposta.json();
}

export { executarConsultaIgdb };
