const db = require("./src/config/database");

// Limpa os dados e reseta o autoincrement
db.exec(`
  DELETE FROM livros;
  DELETE FROM autores;
  DELETE FROM sqlite_sequence WHERE name='autores';
  DELETE FROM sqlite_sequence WHERE name='livros';
`);

const insertAutor = db.prepare("INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)");
const insertLivro = db.prepare("INSERT INTO livros (titulo, ano, autor_id, isbn) VALUES (?, ?, ?, ?)");

// Autores
const saramago   = insertAutor.run("José Saramago",         "Portuguesa");
const machado    = insertAutor.run("Machado de Assis",       "Brasileira");
const pessoa     = insertAutor.run("Fernando Pessoa",        "Portuguesa");
const queiros    = insertAutor.run("Eça de Queirós",         "Portuguesa");
const amado      = insertAutor.run("Jorge Amado",            "Brasileira");
const clarice    = insertAutor.run("Clarice Lispector",      "Brasileira");
const lobo       = insertAutor.run("Sophia de Mello Breyner","Portuguesa");
const drummond   = insertAutor.run("Carlos Drummond de Andrade","Brasileira");
const antunes    = insertAutor.run("António Lobo Antunes",   "Portuguesa");
const rosa       = insertAutor.run("Guimarães Rosa",         "Brasileira");

// Livros — José Saramago
insertLivro.run("Ensaio sobre a Cegueira",              1995, saramago.lastInsertRowid,  "978-972-23-1956-0");
insertLivro.run("O Evangelho segundo Jesus Cristo",     1991, saramago.lastInsertRowid,  "978-972-23-1430-5");
insertLivro.run("Memorial do Convento",                 1982, saramago.lastInsertRowid,  "978-972-23-1048-2");
insertLivro.run("Ensaio sobre a Lucidez",               2004, saramago.lastInsertRowid,  "978-972-23-3116-6");

// Livros — Machado de Assis
insertLivro.run("Dom Casmurro",                         1899, machado.lastInsertRowid,   "978-85-359-0277-5");
insertLivro.run("Memórias Póstumas de Brás Cubas",      1881, machado.lastInsertRowid,   "978-85-359-0278-2");
insertLivro.run("Quincas Borba",                        1891, machado.lastInsertRowid,   "978-85-359-0279-9");
insertLivro.run("O Alienista",                          1882, machado.lastInsertRowid,   "978-85-359-0280-5");

// Livros — Fernando Pessoa
insertLivro.run("Livro do Desassossego",                1982, pessoa.lastInsertRowid,    "978-972-23-2358-1");
insertLivro.run("Mensagem",                             1934, pessoa.lastInsertRowid,    "978-972-23-1001-4");

// Livros — Eça de Queirós
insertLivro.run("Os Maias",                             1888, queiros.lastInsertRowid,   "978-972-23-1111-0");
insertLivro.run("O Crime do Padre Amaro",               1875, queiros.lastInsertRowid,   "978-972-23-1112-7");
insertLivro.run("A Relíquia",                           1887, queiros.lastInsertRowid,   "978-972-23-1113-4");

// Livros — Jorge Amado
insertLivro.run("Gabriela, Cravo e Canela",             1958, amado.lastInsertRowid,     "978-85-359-0300-0");
insertLivro.run("Capitães da Areia",                    1937, amado.lastInsertRowid,     "978-85-359-0301-7");
insertLivro.run("Dona Flor e Seus Dois Maridos",        1966, amado.lastInsertRowid,     "978-85-359-0302-4");

// Livros — Clarice Lispector
insertLivro.run("A Paixão Segundo G.H.",                1964, clarice.lastInsertRowid,   "978-85-359-0310-9");
insertLivro.run("A Hora da Estrela",                    1977, clarice.lastInsertRowid,   "978-85-359-0311-6");
insertLivro.run("Perto do Coração Selvagem",            1943, clarice.lastInsertRowid,   "978-85-359-0312-3");

// Livros — Sophia de Mello Breyner
insertLivro.run("Coral",                                1950, lobo.lastInsertRowid,      "978-972-23-2001-6");
insertLivro.run("Geografia",                            1967, lobo.lastInsertRowid,      "978-972-23-2002-3");

// Livros — Carlos Drummond de Andrade
insertLivro.run("Alguma Poesia",                        1930, drummond.lastInsertRowid,  "978-85-359-0320-8");
insertLivro.run("A Rosa do Povo",                       1945, drummond.lastInsertRowid,  "978-85-359-0321-5");
insertLivro.run("Sentimento do Mundo",                  1940, drummond.lastInsertRowid,  "978-85-359-0322-2");

// Livros — António Lobo Antunes
insertLivro.run("Fado Alexandrino",                     1983, antunes.lastInsertRowid,   "978-972-23-3001-5");
insertLivro.run("As Naus",                              1988, antunes.lastInsertRowid,   "978-972-23-3002-2");

// Livros — Guimarães Rosa
insertLivro.run("Grande Sertão: Veredas",               1956, rosa.lastInsertRowid,      "978-85-359-0330-7");
insertLivro.run("Sagarana",                             1946, rosa.lastInsertRowid,      "978-85-359-0331-4");
insertLivro.run("Primeiras Estórias",                   1962, rosa.lastInsertRowid,      "978-85-359-0332-1");

console.log("Seed concluído com sucesso!");
console.log("10 autores e 30 livros inseridos.");
console.log("IDs dos autores começam em 1.");
