const ESTILO_GRADE_CATALOGO = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(auto-fill, minmax(160px, 1fr))",
    sm: "repeat(auto-fill, minmax(200px, 1fr))",
    md: "repeat(auto-fill, minmax(220px, 1fr))",
  },
  gap: { xs: 2, md: 3 },
};

const QUANTIDADE_SKELETONS = 8;

export { ESTILO_GRADE_CATALOGO, QUANTIDADE_SKELETONS };
