import { Router } from "express";
import { consultarJogosIgdb } from "../servicos/consultaIgdb.js";
import { mapearListaJogosIgdb } from "../utilidades/mapearJogoIgdb.js";

const rotaJogos = Router();

rotaJogos.get("/", async (req, res) => {
  try {
    const termoBusca = req.query.busca;
    const jogosIgdb = await consultarJogosIgdb(termoBusca);
    const jogos = mapearListaJogosIgdb(jogosIgdb);

    res.json(jogos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Não foi possível consultar os jogos no momento.",
    });
  }
});

export default rotaJogos;
