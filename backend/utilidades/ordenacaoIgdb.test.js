import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  ordenarJogosPorIds,
  ordenarJogosPorPopScore,
} from "./ordenacaoIgdb.js";

describe("ordenarJogosPorIds", () => {
  it("preserva a ordem dos IDs do PopScore", () => {
    const jogos = [
      { id: 3, name: "C" },
      { id: 1, name: "A" },
      { id: 2, name: "B" },
    ];

    const resultado = ordenarJogosPorIds(jogos, [1, 2, 3]);

    assert.deepEqual(
      resultado.map((jogo) => jogo.id),
      [1, 2, 3]
    );
  });
});

describe("ordenarJogosPorPopScore", () => {
  it("ordena jogos pelo valor do IGDB PopScore", () => {
    const jogos = [
      { id: 10, name: "Baixo" },
      { id: 20, name: "Alto" },
      { id: 30, name: "Médio" },
    ];
    const pontuacoes = new Map([
      [10, 0.001],
      [20, 0.009],
      [30, 0.005],
    ]);

    const resultado = ordenarJogosPorPopScore(jogos, pontuacoes);

    assert.deepEqual(
      resultado.map((jogo) => jogo.id),
      [20, 30, 10]
    );
  });
});
