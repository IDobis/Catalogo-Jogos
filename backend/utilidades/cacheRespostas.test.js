import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  armazenarCacheResposta,
  limparCacheRespostas,
  montarChaveCache,
  obterCacheResposta,
} from "./cacheRespostas.js";

describe("cacheRespostas", () => {
  it("monta chave única por URL e consulta", () => {
    const chaveA = montarChaveCache("https://api.igdb.com/v4/games", "fields name;");
    const chaveB = montarChaveCache("https://api.igdb.com/v4/games", "fields id;");
    const chaveC = montarChaveCache(
      "https://api.igdb.com/v4/popularity_primitives",
      "fields name;"
    );

    assert.notEqual(chaveA, chaveB);
    assert.notEqual(chaveA, chaveC);
  });

  it("retorna valor armazenado enquanto não expirou", () => {
    limparCacheRespostas();
    armazenarCacheResposta("jogo-1", [{ id: 1 }], 60_000);

    assert.deepEqual(obterCacheResposta("jogo-1"), [{ id: 1 }]);
  });

  it("remove valor expirado", async () => {
    limparCacheRespostas();
    armazenarCacheResposta("jogo-2", [{ id: 2 }], 15);

    await new Promise((resolver) => setTimeout(resolver, 20));

    assert.equal(obterCacheResposta("jogo-2"), undefined);
  });
});
