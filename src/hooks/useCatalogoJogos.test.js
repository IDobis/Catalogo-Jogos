import { act, renderHook, waitFor } from "@testing-library/react";
import buscarJogos from "../servicos/apiCatalogo";
import useCatalogoJogos from "./useCatalogoJogos";

jest.mock("../servicos/apiCatalogo");

describe("useCatalogoJogos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    buscarJogos.mockResolvedValue({
      jogos: [{ identificador: 1, titulo: "Jogo Teste" }],
      temMais: false,
    });
  });

  it("carrega jogos na inicialização", async () => {
    const { result } = renderHook(() => useCatalogoJogos());

    await waitFor(() => {
      expect(result.current.carregandoInicial).toBe(false);
    });

    expect(result.current.jogos).toHaveLength(1);
    expect(result.current.jogos[0].titulo).toBe("Jogo Teste");
    expect(buscarJogos).toHaveBeenCalled();
  });

  it("define mensagem de erro quando a API falha", async () => {
    buscarJogos.mockRejectedValueOnce(new Error("Falha"));

    const { result } = renderHook(() => useCatalogoJogos());

    await waitFor(() => {
      expect(result.current.carregandoInicial).toBe(false);
    });

    expect(result.current.mensagemErro).toMatch(/Não foi possível carregar/);
    expect(result.current.jogos).toHaveLength(0);
  });

  it("atualiza ordenação e dispara nova busca", async () => {
    const { result } = renderHook(() => useCatalogoJogos());

    await waitFor(() => {
      expect(result.current.carregandoInicial).toBe(false);
    });

    act(() => {
      result.current.setOrdenacao("nome");
    });

    await waitFor(() => {
      expect(buscarJogos).toHaveBeenLastCalledWith(
        expect.objectContaining({ ordenacao: "nome" })
      );
    });
  });
});
