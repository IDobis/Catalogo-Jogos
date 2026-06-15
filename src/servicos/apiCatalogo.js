async function buscarJogos(termoBusca) {
  const parametros = new URLSearchParams();

  if (termoBusca?.trim()) {
    parametros.set("busca", termoBusca.trim());
  }

  const url =
    parametros.size > 0 ? `/api/jogos?${parametros}` : "/api/jogos";

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Falha ao buscar jogos na API.");
  }

  return resposta.json();
}

export default buscarJogos;
