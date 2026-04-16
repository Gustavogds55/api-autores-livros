const Database = require("better-sqlite3");
const path = require("path");

// Cria ou abre o ficheiro de banco de dados na raiz do projeto
const db = new Database(path.join(__dirname, "../../treino.db"));

// Ativa suporte a foreign keys no SQLite (desativado por padrão)
db.pragma("foreign_keys = ON");

// Cria as tabelas se ainda não existirem
db.exec(`
  CREATE TABLE IF NOT EXISTS autores (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nome          TEXT    NOT NULL,
    nacionalidade TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS livros (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo   TEXT    NOT NULL,
    ano      INTEGER NOT NULL,
    autor_id INTEGER NOT NULL,
    isbn     TEXT    NOT NULL UNIQUE,
    FOREIGN KEY (autor_id) REFERENCES autores(id)
  );
`);

module.exports = db;
