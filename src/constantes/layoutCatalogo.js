const ESTILO_GRADE_CATALOGO = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(auto-fill, minmax(140px, 1fr))",
    sm: "repeat(auto-fill, minmax(180px, 1fr))",
    md: "repeat(auto-fill, minmax(220px, 1fr))",
  },
  gap: { xs: 1.5, sm: 2, md: 3 },
};

const QUANTIDADE_SKELETONS = 8;

const CHAVE_NAVBAR_EXPANDIDA = "catalogo-jogos-navbar-expandida";

export { ESTILO_GRADE_CATALOGO, QUANTIDADE_SKELETONS, CHAVE_NAVBAR_EXPANDIDA };
