import "dotenv/config";
import cors from "cors";
import express from "express";
import rotaJogos from "./rotas/jogos.js";
import { obterTokenAcesso } from "./servicos/autenticacaoTwitch.js";

const aplicacao = express();
const portaServidor = process.env.PORTA_SERVIDOR ?? 3001;
const origemFrontend = process.env.ORIGEM_FRONTEND ?? "http://localhost:3000";

aplicacao.use(
  cors({
    origin: origemFrontend,
  })
);

aplicacao.get("/api/saude", (_req, res) => {
  res.json({ status: "ok" });
});

aplicacao.use("/api/jogos", rotaJogos);

aplicacao.listen(portaServidor, () => {
  console.log(`Backend rodando em http://localhost:${portaServidor}`);

  obterTokenAcesso().catch((erro) => {
    console.warn("Não foi possível pré-aquecer o token Twitch:", erro.message);
  });
});
