import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  mapearJogoDetalheIgdb,
  mapearJogoIgdb,
  mapearListaJogosIgdb,
} from "../utilidades/mapearJogoIgdb.js";

describe("mapearJogoIgdb", () => {
  it("mapeia campos principais de um jogo da IGDB", () => {
    const jogoIgdb = {
      id: 42,
      name: "Hollow Knight",
      cover: { image_id: "co1abc" },
      genres: [{ name: "Platform" }, { name: "Adventure" }],
      platforms: [{ name: "PC (Microsoft Windows)" }],
      first_release_date: 1488326400,
      rating: 91.2,
    };

    const resultado = mapearJogoIgdb(jogoIgdb);

    assert.equal(resultado.identificador, 42);
    assert.equal(resultado.titulo, "Hollow Knight");
    assert.equal(resultado.genero, "Platform, Adventure");
    assert.equal(resultado.plataforma, "PC (Microsoft Windows)");
    assert.equal(resultado.anoLancamento, 2017);
    assert.equal(resultado.nota, 91);
    assert.match(
      resultado.urlImagemCapa,
      /https:\/\/images\.igdb\.com\/igdb\/image\/upload\/t_cover_big\/co1abc\.webp/
    );
  });

  it("usa valores padrão quando campos opcionais estão ausentes", () => {
    const resultado = mapearJogoIgdb({ id: 7 });

    assert.equal(resultado.titulo, "Sem título");
    assert.equal(resultado.genero, "—");
    assert.equal(resultado.plataforma, "—");
    assert.equal(resultado.urlImagemCapa, null);
    assert.equal(resultado.anoLancamento, null);
    assert.equal(resultado.nota, null);
  });
});

describe("mapearListaJogosIgdb", () => {
  it("mapeia cada item da lista", () => {
    const lista = mapearListaJogosIgdb([
      { id: 1, name: "Jogo A" },
      { id: 2, name: "Jogo B" },
    ]);

    assert.equal(lista.length, 2);
    assert.equal(lista[0].titulo, "Jogo A");
    assert.equal(lista[1].titulo, "Jogo B");
  });
});

describe("mapearJogoDetalheIgdb", () => {
  it("inclui resumo, mídia e listas de gêneros e plataformas", () => {
    const resultado = mapearJogoDetalheIgdb({
      id: 10,
      name: "Celeste",
      summary: "Um jogo desafiador.",
      genres: [{ name: "Platform" }],
      platforms: [{ name: "Nintendo Switch" }],
      first_release_date: 1515542400,
      rating: 93,
      videos: [{ video_id: "abc123", name: "Launch Trailer" }],
      screenshots: [{ image_id: "sc1xyz" }, { image_id: "sc2xyz" }],
    });

    assert.equal(resultado.resumo, "Um jogo desafiador.");
    assert.deepEqual(resultado.generos, ["Platform"]);
    assert.deepEqual(resultado.plataformas, ["Nintendo Switch"]);
    assert.equal(resultado.anoLancamento, 2018);
    assert.equal(resultado.trailers.length, 1);
    assert.equal(resultado.trailers[0].titulo, "Launch Trailer");
    assert.match(
      resultado.trailers[0].urlEmbed,
      /https:\/\/www\.youtube\.com\/embed\/abc123/
    );
    assert.equal(resultado.screenshots.length, 2);
    assert.match(
      resultado.screenshots[0].urlImagem,
      /t_screenshot_huge\/sc1xyz\.webp/
    );
  });

  it("retorna listas vazias quando não há mídia", () => {
    const resultado = mapearJogoDetalheIgdb({ id: 1, name: "Jogo" });

    assert.deepEqual(resultado.trailers, []);
    assert.deepEqual(resultado.screenshots, []);
  });
});
