const express = require("express");

// Inicializa o banco e cria as tabelas ao arrancar
require("./src/config/database");

const autoresRoutes = require("./src/routes/autores");
const livrosRoutes = require("./src/routes/livros");

const app = express();
app.use(express.json());

// Rotas
app.use("/autores", autoresRoutes);
app.use("/livros", livrosRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({ success: true, data: "API Autores & Livros a funcionar!" });
});

// Handler para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Rota não encontrada" });
});

// Handler de erros globais
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a correr em http://localhost:${PORT}`));
