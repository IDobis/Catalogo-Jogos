function formatarPreco(valorPreco) {
  return valorPreco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default formatarPreco;
