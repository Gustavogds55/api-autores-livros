const db = require("../config/database");
const { success, error } = require("../helpers/response");

// GET /autores
const listar = (req, res) => {
  try {
    const autores = db.prepare("SELECT * FROM autores").all();
    return success(res, autores);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// GET /autores/:id
const buscarPorId = (req, res) => {
  try {
    const autor = db.prepare("SELECT * FROM autores WHERE id = ?").get(req.params.id);
    if (!autor) return error(res, "Autor não encontrado", 404);
    return success(res, autor);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// POST /autores
const criar = (req, res) => {
  try {
    const { nome, nacionalidade } = req.body;

    if (!nome) return error(res, "O campo 'nome' é obrigatório");
    if (nome.trim().length < 3) return error(res, "O campo 'nome' deve ter pelo menos 3 caracteres");
    if (!nacionalidade) return error(res, "O campo 'nacionalidade' é obrigatório");

    const result = db
      .prepare("INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)")
      .run(nome.trim(), nacionalidade.trim());

    const novoAutor = db.prepare("SELECT * FROM autores WHERE id = ?").get(result.lastInsertRowid);
    return success(res, novoAutor, 201);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// PUT /autores/:id
const atualizar = (req, res) => {
  try {
    const autor = db.prepare("SELECT * FROM autores WHERE id = ?").get(req.params.id);
    if (!autor) return error(res, "Autor não encontrado", 404);

    const { nome, nacionalidade } = req.body;

    if (!nome) return error(res, "O campo 'nome' é obrigatório");
    if (nome.trim().length < 3) return error(res, "O campo 'nome' deve ter pelo menos 3 caracteres");
    if (!nacionalidade) return error(res, "O campo 'nacionalidade' é obrigatório");

    db.prepare("UPDATE autores SET nome = ?, nacionalidade = ? WHERE id = ?")
      .run(nome.trim(), nacionalidade.trim(), req.params.id);

    const atualizado = db.prepare("SELECT * FROM autores WHERE id = ?").get(req.params.id);
    return success(res, atualizado);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// DELETE /autores/:id
const remover = (req, res) => {
  try {
    const autor = db.prepare("SELECT * FROM autores WHERE id = ?").get(req.params.id);
    if (!autor) return error(res, "Autor não encontrado", 404);

    // Verifica se o autor tem livros associados
    const livros = db.prepare("SELECT id FROM livros WHERE autor_id = ?").all(req.params.id);
    if (livros.length > 0)
      return error(res, "Não é possível apagar um autor com livros associados", 409);

    db.prepare("DELETE FROM autores WHERE id = ?").run(req.params.id);
    return success(res, { mensagem: "Autor apagado com sucesso" });
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// GET /autores/:id/livros
const listarLivros = (req, res) => {
  try {
    const autor = db.prepare("SELECT * FROM autores WHERE id = ?").get(req.params.id);
    if (!autor) return error(res, "Autor não encontrado", 404);

    const livros = db.prepare("SELECT * FROM livros WHERE autor_id = ?").all(req.params.id);
    return success(res, livros);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

module.exports = { listar, buscarPorId, criar, atualizar, remover, listarLivros };
