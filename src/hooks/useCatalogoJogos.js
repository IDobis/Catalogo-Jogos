import { useCallback, useEffect, useState } from "react";
import { FILTROS_INICIAIS } from "../constantes/filtrosCatalogo";
import {
  LIMITE_POR_PAGINA,
  ORDENACAO_PADRAO,
} from "../constantes/ordenacaoCatalogo";
import buscarJogos from "../servicos/apiCatalogo";

const ATRASO_BUSCA_MS = 400;

function useCatalogoJogos() {
  const [textoBusca, setTextoBusca] = useState("");
  const [termoConsulta, setTermoConsulta] = useState("");
  const [ordenacao, setOrdenacao] = useState(ORDENACAO_PADRAO);
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS);
  const [jogos, setJogos] = useState([]);
  const [temMais, setTemMais] = useState(false);
  const [carregandoInicial, setCarregandoInicial] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [mensagemErro, setMensagemErro] = useState(null);
  const [chaveRecarga, setChaveRecarga] = useState(0);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setTermoConsulta(textoBusca);
    }, ATRASO_BUSCA_MS);

    return () => clearTimeout(temporizador);
  }, [textoBusca]);

  useEffect(() => {
    let consultaCancelada = false;

    async function carregarJogos() {
      setCarregandoInicial(true);
      setMensagemErro(null);
      setJogos([]);
      setTemMais(false);

      try {
        const resultado = await buscarJogos({
          termoBusca: termoConsulta,
          ordenacao,
          offset: 0,
          limite: LIMITE_POR_PAGINA,
          filtros,
        });

        if (!consultaCancelada) {
          setJogos(resultado.jogos);
          setTemMais(resultado.temMais);
        }
      } catch {
        if (!consultaCancelada) {
          setJogos([]);
          setTemMais(false);
          setMensagemErro(
            "Não foi possível carregar os jogos. Verifique se o backend está rodando."
          );
        }
      } finally {
        if (!consultaCancelada) {
          setCarregandoInicial(false);
        }
      }
    }

    carregarJogos();

    return () => {
      consultaCancelada = true;
    };
  }, [termoConsulta, ordenacao, filtros, chaveRecarga]);

  const carregarMais = useCallback(async () => {
    if (carregandoInicial || carregandoMais || !temMais) {
      return;
    }

    setCarregandoMais(true);
    setMensagemErro(null);

    try {
      const resultado = await buscarJogos({
        termoBusca: termoConsulta,
        ordenacao,
        offset: jogos.length,
        limite: LIMITE_POR_PAGINA,
        filtros,
      });

      setJogos((listaAtual) => [...listaAtual, ...resultado.jogos]);
      setTemMais(resultado.temMais);
    } catch {
      setMensagemErro("Não foi possível carregar mais jogos. Tente novamente.");
    } finally {
      setCarregandoMais(false);
    }
  }, [
    carregandoInicial,
    carregandoMais,
    temMais,
    termoConsulta,
    ordenacao,
    filtros,
    jogos.length,
  ]);

  const recarregar = useCallback(() => {
    setChaveRecarga((valorAtual) => valorAtual + 1);
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros(FILTROS_INICIAIS);
  }, []);

  return {
    textoBusca,
    setTextoBusca,
    ordenacao,
    setOrdenacao,
    filtros,
    setFiltros,
    limparFiltros,
    jogos,
    temMais,
    carregandoInicial,
    carregandoMais,
    mensagemErro,
    carregarMais,
    recarregar,
  };
}

export default useCatalogoJogos;
