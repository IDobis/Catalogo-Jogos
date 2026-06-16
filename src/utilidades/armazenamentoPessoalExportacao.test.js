import {
  aplicarImportacao,
  montarDadosExportacao,
  parsearArquivoImportacao,
  serializarDadosExportacao,
} from "./armazenamentoPessoalExportacao";

describe("armazenamentoPessoalExportacao", () => {
  const favoritoExemplo = {
    identificador: 42,
    titulo: "Hollow Knight",
    genero: "Platform",
    plataforma: "PC",
    urlImagemCapa: "https://exemplo.com/capa.webp",
    anoLancamento: 2017,
    nota: 91,
    origem: "favorito",
  };

  const jogoLocalExemplo = {
    identificador: "local-123",
    titulo: "Jogo Indie",
    genero: "RPG",
    plataforma: "Switch",
    urlImagemCapa: null,
    anoLancamento: 2020,
    nota: 80,
    origem: "local",
  };

  it("monta e serializa dados de exportação", () => {
    const dados = montarDadosExportacao([favoritoExemplo], [jogoLocalExemplo]);

    expect(dados.versao).toBe(1);
    expect(dados.favoritos).toHaveLength(1);
    expect(dados.minhaLista).toHaveLength(1);
    expect(dados.exportadoEm).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    const json = serializarDadosExportacao(dados);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it("ignora itens inválidos na exportação", () => {
    const dados = montarDadosExportacao(
      [favoritoExemplo, { titulo: "Sem id" }],
      [jogoLocalExemplo, { identificador: "local-1" }]
    );

    expect(dados.favoritos).toHaveLength(1);
    expect(dados.minhaLista).toHaveLength(1);
  });

  it("parseia arquivo de importação válido", () => {
    const conteudo = JSON.stringify({
      versao: 1,
      favoritos: [favoritoExemplo],
      minhaLista: [jogoLocalExemplo],
    });

    const resultado = parsearArquivoImportacao(conteudo);

    expect(resultado.sucesso).toBe(true);
    expect(resultado.resumo.quantidadeFavoritos).toBe(1);
    expect(resultado.resumo.quantidadeMinhaLista).toBe(1);
  });

  it("rejeita JSON inválido", () => {
    const resultado = parsearArquivoImportacao("{ invalido");

    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toMatch(/JSON válido/);
  });

  it("rejeita arquivo sem dados válidos", () => {
    const resultado = parsearArquivoImportacao(
      JSON.stringify({ versao: 1, favoritos: [], minhaLista: [] })
    );

    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toMatch(/não contém favoritos/);
  });

  it("substitui listas no modo substituir", () => {
    const importados = {
      favoritos: [favoritoExemplo],
      minhaLista: [jogoLocalExemplo],
    };

    const resultado = aplicarImportacao([], [], importados, "substituir");

    expect(resultado.favoritos).toHaveLength(1);
    expect(resultado.minhaLista).toHaveLength(1);
  });

  it("mescla listas sem duplicar identificadores", () => {
    const favoritoAtual = { ...favoritoExemplo, titulo: "Versão antiga" };
    const favoritoImportado = {
      ...favoritoExemplo,
      identificador: 99,
      titulo: "Novo favorito",
    };

    const resultado = aplicarImportacao(
      [favoritoAtual],
      [],
      { favoritos: [favoritoExemplo, favoritoImportado], minhaLista: [] },
      "mesclar"
    );

    expect(resultado.favoritos).toHaveLength(2);
    expect(
      resultado.favoritos.find((jogo) => jogo.identificador === 42).titulo
    ).toBe("Hollow Knight");
    expect(
      resultado.favoritos.find((jogo) => jogo.identificador === 99).titulo
    ).toBe("Novo favorito");
  });
});
