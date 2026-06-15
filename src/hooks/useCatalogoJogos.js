import { useEffect, useState } from "react";
import buscarJogos from "../servicos/apiCatalogo";

const ATRASO_BUSCA_MS = 400;

function useCatalogoJogos() {
  const [textoBusca, setTextoBusca] = useState("");
  const [termoConsulta, setTermoConsulta] = useState("");
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState(null);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setTermoConsulta(textoBusca);
    }, ATRASO_BUSCA_MS);

    return () => clearTimeout(temporizador);
  }, [textoBusca]);

  useEffect(() => {
    let consultaCancelada = false;

    async function carregarJogos() {
      setCarregando(true);
      setMensagemErro(null);

      try {
        const listaJogos = await buscarJogos(termoConsulta);

        if (!consultaCancelada) {
          setJogos(listaJogos);
        }
      } catch {
        if (!consultaCancelada) {
          setJogos([]);
          setMensagemErro(
            "Não foi possível carregar os jogos. Verifique se o backend está rodando."
          );
        }
      } finally {
        if (!consultaCancelada) {
          setCarregando(false);
        }
      }
    }

    carregarJogos();

    return () => {
      consultaCancelada = true;
    };
  }, [termoConsulta]);

  return {
    textoBusca,
    setTextoBusca,
    jogos,
    carregando,
    mensagemErro,
  };
}

export default useCatalogoJogos;
