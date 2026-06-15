import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  CHAVE_FAVORITOS,
  CHAVE_JOGOS_LOCAIS,
} from "../constantes/armazenamentoPessoal";
import { lerLista, salvarLista } from "../servicos/armazenamentoLocal";

const ArmazenamentoPessoalContext = createContext(null);

function normalizarJogoFavorito(dadosJogo) {
  return {
    identificador: dadosJogo.identificador,
    titulo: dadosJogo.titulo,
    genero: Array.isArray(dadosJogo.generos)
      ? dadosJogo.generos.join(", ")
      : dadosJogo.genero ?? "—",
    plataforma: Array.isArray(dadosJogo.plataformas)
      ? dadosJogo.plataformas.join(", ")
      : dadosJogo.plataforma ?? "—",
    urlImagemCapa: dadosJogo.urlImagemCapa ?? null,
    anoLancamento: dadosJogo.anoLancamento ?? null,
    nota: dadosJogo.nota ?? null,
    origem: "favorito",
  };
}

function criarJogoLocal(dados) {
  return {
    identificador: `local-${Date.now()}`,
    titulo: dados.titulo.trim(),
    genero: dados.genero.trim() || "—",
    plataforma: dados.plataforma.trim() || "—",
    urlImagemCapa: dados.urlImagemCapa?.trim() || null,
    anoLancamento: dados.anoLancamento
      ? Number.parseInt(dados.anoLancamento, 10)
      : null,
    nota: dados.nota ? Number.parseInt(dados.nota, 10) : null,
    origem: "local",
  };
}

function ArmazenamentoPessoalProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => lerLista(CHAVE_FAVORITOS));
  const [jogosLocais, setJogosLocais] = useState(() =>
    lerLista(CHAVE_JOGOS_LOCAIS)
  );

  useEffect(() => {
    salvarLista(CHAVE_FAVORITOS, favoritos);
  }, [favoritos]);

  useEffect(() => {
    salvarLista(CHAVE_JOGOS_LOCAIS, jogosLocais);
  }, [jogosLocais]);

  const ehFavorito = useCallback(
    (identificador) =>
      favoritos.some((jogo) => jogo.identificador === identificador),
    [favoritos]
  );

  const alternarFavorito = useCallback((dadosJogo) => {
    setFavoritos((listaAtual) => {
      const jaFavorito = listaAtual.some(
        (jogo) => jogo.identificador === dadosJogo.identificador
      );

      if (jaFavorito) {
        return listaAtual.filter(
          (jogo) => jogo.identificador !== dadosJogo.identificador
        );
      }

      return [...listaAtual, normalizarJogoFavorito(dadosJogo)];
    });
  }, []);

  const adicionarJogoLocal = useCallback((dados) => {
    const novoJogo = criarJogoLocal(dados);
    setJogosLocais((listaAtual) => [novoJogo, ...listaAtual]);
    return novoJogo;
  }, []);

  const atualizarJogoLocal = useCallback((identificador, dados) => {
    setJogosLocais((listaAtual) =>
      listaAtual.map((jogo) =>
        jogo.identificador === identificador
          ? {
              ...jogo,
              titulo: dados.titulo.trim(),
              genero: dados.genero.trim() || "—",
              plataforma: dados.plataforma.trim() || "—",
              urlImagemCapa: dados.urlImagemCapa?.trim() || null,
              anoLancamento: dados.anoLancamento
                ? Number.parseInt(dados.anoLancamento, 10)
                : null,
              nota: dados.nota ? Number.parseInt(dados.nota, 10) : null,
            }
          : jogo
      )
    );
  }, []);

  const removerJogoLocal = useCallback((identificador) => {
    setJogosLocais((listaAtual) =>
      listaAtual.filter((jogo) => jogo.identificador !== identificador)
    );
  }, []);

  const valor = {
    favoritos,
    jogosLocais,
    ehFavorito,
    alternarFavorito,
    adicionarJogoLocal,
    atualizarJogoLocal,
    removerJogoLocal,
  };

  return (
    <ArmazenamentoPessoalContext.Provider value={valor}>
      {children}
    </ArmazenamentoPessoalContext.Provider>
  );
}

function useArmazenamentoPessoal() {
  const contexto = useContext(ArmazenamentoPessoalContext);

  if (!contexto) {
    throw new Error(
      "useArmazenamentoPessoal deve ser usado dentro de ArmazenamentoPessoalProvider"
    );
  }

  return contexto;
}

export { ArmazenamentoPessoalProvider, useArmazenamentoPessoal };
