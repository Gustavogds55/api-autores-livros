const db = require("./src/config/database");

// Limpa os dados existentes para evitar duplicados
db.exec("DELETE FROM livros; DELETE FROM autores;");

// Insere autores de exemplo
const insertAutor = db.prepare("INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)");
const autor1 = insertAutor.run("José Saramago", "Portuguesa");
const autor2 = insertAutor.run("Machado de Assis", "Brasileira");
const autor3 = insertAutor.run("Fernando Pessoa", "Portuguesa");

// Insere livros de exemplo
const insertLivro = db.prepare("INSERT INTO livros (titulo, ano, autor_id, isbn) VALUES (?, ?, ?, ?)");
insertLivro.run("Ensaio sobre a Cegueira", 1995, autor1.lastInsertRowid, "978-972-23-1956-0");
insertLivro.run("O Evangelho segundo Jesus Cristo", 1991, autor1.lastInsertRowid, "978-972-23-1430-5");
insertLivro.run("Dom Casmurro", 1899, autor2.lastInsertRowid, "978-85-359-0277-5");
insertLivro.run("Memórias Póstumas de Brás Cubas", 1881, autor2.lastInsertRowid, "978-85-359-0278-2");
insertLivro.run("Livro do Desassossego", 1982, autor3.lastInsertRowid, "978-972-23-2358-1");

console.log("Seed concluído com sucesso!");
console.log("3 autores e 5 livros inseridos.");
