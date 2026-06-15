import { useCallback, useEffect, useState } from "react";
import { buscarJogoPorId } from "../servicos/apiCatalogo";

function useJogoDetalhe(identificador) {
  const [jogo, setJogo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState(null);
  const [chaveRecarga, setChaveRecarga] = useState(0);

  useEffect(() => {
    if (!Number.isInteger(identificador) || identificador <= 0) {
      setCarregando(false);
      setMensagemErro("Jogo não encontrado.");
      setJogo(null);
      return;
    }

    let consultaCancelada = false;

    async function carregarJogo() {
      setCarregando(true);
      setMensagemErro(null);
      setJogo(null);

      try {
        const dadosJogo = await buscarJogoPorId(identificador);

        if (!consultaCancelada) {
          setJogo(dadosJogo);
        }
      } catch (erro) {
        if (!consultaCancelada) {
          setMensagemErro(
            erro.message === "Jogo não encontrado."
              ? "Jogo não encontrado."
              : "Não foi possível carregar os detalhes do jogo. Verifique se o backend está rodando."
          );
        }
      } finally {
        if (!consultaCancelada) {
          setCarregando(false);
        }
      }
    }

    carregarJogo();

    return () => {
      consultaCancelada = true;
    };
  }, [identificador, chaveRecarga]);

  const recarregar = useCallback(() => {
    setChaveRecarga((valorAtual) => valorAtual + 1);
  }, []);

  return {
    jogo,
    carregando,
    mensagemErro,
    recarregar,
  };
}

export default useJogoDetalhe;
