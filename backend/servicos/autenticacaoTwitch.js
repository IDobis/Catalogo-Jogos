let tokenEmCache = null;
let tokenExpiraEm = 0;

function obterCredenciais() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Credenciais Twitch ausentes. Configure TWITCH_CLIENT_ID e TWITCH_CLIENT_SECRET no .env"
    );
  }

  return { clientId, clientSecret };
}

async function obterTokenAcesso() {
  const agora = Date.now();

  if (tokenEmCache && agora < tokenExpiraEm) {
    return tokenEmCache;
  }

  const { clientId, clientSecret } = obterCredenciais();
  const parametros = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const resposta = await fetch(
    `https://id.twitch.tv/oauth2/token?${parametros.toString()}`,
    { method: "POST" }
  );

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`Falha na autenticação Twitch: ${detalhe}`);
  }

  const dados = await resposta.json();
  const margemSegurancaMs = 60_000;

  tokenEmCache = dados.access_token;
  tokenExpiraEm = agora + dados.expires_in * 1000 - margemSegurancaMs;

  return tokenEmCache;
}

export { obterCredenciais, obterTokenAcesso };
