function lerLista(chave) {
  try {
    const conteudo = localStorage.getItem(chave);

    if (!conteudo) {
      return [];
    }

    const lista = JSON.parse(conteudo);
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

function salvarLista(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}

export { lerLista, salvarLista };
