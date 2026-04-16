const db = require("../config/database");
const { success, error } = require("../helpers/response");

// GET /livros?ano=&titulo=
const listar = (req, res) => {
  try {
    const { ano, titulo } = req.query;
    let query = "SELECT * FROM livros WHERE 1=1";
    const params = [];

    if (ano) {
      query += " AND ano = ?";
      params.push(ano);
    }
    if (titulo) {
      query += " AND titulo LIKE ?";
      params.push(`%${titulo}%`);
    }

    const livros = db.prepare(query).all(...params);
    return success(res, livros);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// GET /livros/:id
const buscarPorId = (req, res) => {
  try {
    const livro = db.prepare("SELECT * FROM livros WHERE id = ?").get(req.params.id);
    if (!livro) return error(res, "Livro não encontrado", 404);
    return success(res, livro);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// POST /livros
const criar = (req, res) => {
  try {
    const { titulo, ano, autor_id, isbn } = req.body;

    if (!titulo) return error(res, "O campo 'titulo' é obrigatório");
    if (ano === undefined || ano === null || ano === "") return error(res, "O campo 'ano' é obrigatório");
    if (isNaN(Number(ano))) return error(res, "O campo 'ano' deve ser numérico");
    if (Number(ano) > new Date().getFullYear()) return error(res, "O campo 'ano' não pode ser maior que o ano atual");
    if (!autor_id) return error(res, "O campo 'autor_id' é obrigatório");
    if (!isbn) return error(res, "O campo 'isbn' é obrigatório");

    // Verifica se o autor existe
    const autor = db.prepare("SELECT id FROM autores WHERE id = ?").get(autor_id);
    if (!autor) return error(res, "O autor informado não existe");

    // Verifica ISBN duplicado
    const isbnExistente = db.prepare("SELECT id FROM livros WHERE isbn = ?").get(isbn);
    if (isbnExistente) return error(res, "Já existe um livro com este ISBN", 409);

    const result = db
      .prepare("INSERT INTO livros (titulo, ano, autor_id, isbn) VALUES (?, ?, ?, ?)")
      .run(titulo.trim(), Number(ano), autor_id, isbn.trim());

    const novoLivro = db.prepare("SELECT * FROM livros WHERE id = ?").get(result.lastInsertRowid);
    return success(res, novoLivro, 201);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// PUT /livros/:id
const atualizar = (req, res) => {
  try {
    const livro = db.prepare("SELECT * FROM livros WHERE id = ?").get(req.params.id);
    if (!livro) return error(res, "Livro não encontrado", 404);

    const { titulo, ano, autor_id, isbn } = req.body;

    if (!titulo) return error(res, "O campo 'titulo' é obrigatório");
    if (ano === undefined || ano === null || ano === "") return error(res, "O campo 'ano' é obrigatório");
    if (isNaN(Number(ano))) return error(res, "O campo 'ano' deve ser numérico");
    if (Number(ano) > new Date().getFullYear()) return error(res, "O campo 'ano' não pode ser maior que o ano atual");
    if (!autor_id) return error(res, "O campo 'autor_id' é obrigatório");
    if (!isbn) return error(res, "O campo 'isbn' é obrigatório");

    // Verifica se o autor existe
    const autor = db.prepare("SELECT id FROM autores WHERE id = ?").get(autor_id);
    if (!autor) return error(res, "O autor informado não existe");

    // Verifica ISBN duplicado (ignora o próprio livro)
    const isbnExistente = db.prepare("SELECT id FROM livros WHERE isbn = ? AND id != ?").get(isbn, req.params.id);
    if (isbnExistente) return error(res, "Já existe um livro com este ISBN", 409);

    db.prepare("UPDATE livros SET titulo = ?, ano = ?, autor_id = ?, isbn = ? WHERE id = ?")
      .run(titulo.trim(), Number(ano), autor_id, isbn.trim(), req.params.id);

    const atualizado = db.prepare("SELECT * FROM livros WHERE id = ?").get(req.params.id);
    return success(res, atualizado);
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

// DELETE /livros/:id
const remover = (req, res) => {
  try {
    const livro = db.prepare("SELECT * FROM livros WHERE id = ?").get(req.params.id);
    if (!livro) return error(res, "Livro não encontrado", 404);

    db.prepare("DELETE FROM livros WHERE id = ?").run(req.params.id);
    return success(res, { mensagem: "Livro apagado com sucesso" });
  } catch (e) {
    return error(res, "Erro interno", 500);
  }
};

module.exports = { listar, buscarPorId, criar, atualizar, remover };
