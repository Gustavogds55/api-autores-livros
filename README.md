# 📚 API Autores & Livros

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat&logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat)

API REST construída com **Node.js**, **Express** e **SQLite** para estudo de testes de backend, QA e validações em banco de dados.

Ideal para praticar testes no **Postman**, explorar **validações HTTP** e executar **queries SQL** diretamente no banco.

---

## 📁 Estrutura do projeto

```
API/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração e criação automática das tabelas
│   ├── controllers/
│   │   ├── autoresController.js  # Lógica de negócio — Autores
│   │   └── livrosController.js   # Lógica de negócio — Livros
│   ├── routes/
│   │   ├── autores.js            # Rotas /autores
│   │   └── livros.js             # Rotas /livros
│   └── helpers/
│       └── response.js           # Respostas JSON padronizadas
├── app.js                        # Entrada da aplicação
├── seed.js                       # Dados de exemplo
├── EXERCICIOS.md                 # 70 exercícios práticos sem respostas
├── package.json
└── README.md
```

---

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm (incluído com o Node.js)

### Instalação

```bash
# 1. Clona o repositório
git clone https://github.com/teu-usuario/api-autores-livros.git
cd api-autores-livros

# 2. Instala as dependências
npm install

# 3. (Opcional) Popula o banco com dados de exemplo
npm run seed

# 4. Inicia o servidor
npm start
```

O servidor arranca em: **http://localhost:3000**

---

## 🗄️ Banco de dados

O ficheiro `treino.db` é criado automaticamente na raiz do projeto ao iniciar a aplicação. As tabelas são criadas na primeira execução.

Para inspecionar o banco diretamente no terminal:

```bash
sqlite3 treino.db
```

### Modelo de dados

```
autores                          livros
─────────────────────            ──────────────────────────────
id            INTEGER PK         id        INTEGER PK
nome          TEXT NOT NULL       titulo    TEXT NOT NULL
nacionalidade TEXT NOT NULL       ano       INTEGER NOT NULL
                                  autor_id  INTEGER FK → autores.id
                                  isbn      TEXT NOT NULL UNIQUE
```

---

## 📡 Endpoints

### Autores

| Método   | Rota                  | Descrição                  | Status sucesso |
|----------|-----------------------|----------------------------|----------------|
| `GET`    | `/autores`            | Lista todos os autores     | 200            |
| `GET`    | `/autores/:id`        | Busca autor por ID         | 200            |
| `POST`   | `/autores`            | Cria novo autor            | 201            |
| `PUT`    | `/autores/:id`        | Atualiza autor             | 200            |
| `DELETE` | `/autores/:id`        | Apaga autor                | 200            |
| `GET`    | `/autores/:id/livros` | Lista os livros do autor   | 200            |

### Livros

| Método   | Rota          | Descrição              | Status sucesso |
|----------|---------------|------------------------|----------------|
| `GET`    | `/livros`     | Lista todos os livros  | 200            |
| `GET`    | `/livros/:id` | Busca livro por ID     | 200            |
| `POST`   | `/livros`     | Cria novo livro        | 201            |
| `PUT`    | `/livros/:id` | Atualiza livro         | 200            |
| `DELETE` | `/livros/:id` | Apaga livro            | 200            |

### Query params — GET /livros

| Param    | Exemplo                        | Descrição                        |
|----------|--------------------------------|----------------------------------|
| `ano`    | `/livros?ano=1995`             | Filtra livros pelo ano           |
| `titulo` | `/livros?titulo=cegueira`      | Filtra por título (parcial)      |
| ambos    | `/livros?ano=1995&titulo=ensaio` | Combina os dois filtros        |

---

## 📋 Exemplos de body JSON

### POST /autores
```json
{
  "nome": "Eça de Queirós",
  "nacionalidade": "Portuguesa"
}
```

### PUT /autores/:id
```json
{
  "nome": "Eça de Queirós",
  "nacionalidade": "Portuguesa"
}
```

### POST /livros
```json
{
  "titulo": "Os Maias",
  "ano": 1888,
  "autor_id": 1,
  "isbn": "978-972-23-1111-0"
}
```

### PUT /livros/:id
```json
{
  "titulo": "Os Maias - Edição Revista",
  "ano": 1888,
  "autor_id": 1,
  "isbn": "978-972-23-1111-0"
}
```

---

## ✅ Regras de validação

### Autores
| Campo          | Regra                              |
|----------------|------------------------------------|
| `nome`         | Obrigatório, mínimo 3 caracteres   |
| `nacionalidade`| Obrigatório                        |

### Livros
| Campo      | Regra                                          |
|------------|------------------------------------------------|
| `titulo`   | Obrigatório                                    |
| `ano`      | Obrigatório, numérico, não pode ser futuro     |
| `autor_id` | Obrigatório, deve existir na tabela autores    |
| `isbn`     | Obrigatório, único                             |

### Regras adicionais
- Não é possível apagar um autor com livros associados → `409`
- ISBN duplicado → `409`

---

## 📦 Formato das respostas

Todas as respostas seguem o mesmo contrato JSON:

**Sucesso**
```json
{
  "success": true,
  "data": { }
}
```

**Erro**
```json
{
  "success": false,
  "message": "descrição do erro"
}
```

---

## 🔢 Códigos HTTP

| Código | Situação                                        |
|--------|-------------------------------------------------|
| `200`  | Listagem, atualização ou remoção com sucesso    |
| `201`  | Recurso criado com sucesso                      |
| `400`  | Erro de validação                               |
| `404`  | Recurso não encontrado                          |
| `409`  | Conflito — ISBN duplicado ou autor com livros   |
| `500`  | Erro interno inesperado                         |

---

## 🧪 Cenários de teste (QA)

### Autores

| # | Cenário                        | Método   | Rota          | Body                                                      | Esperado |
|---|--------------------------------|----------|---------------|-----------------------------------------------------------|----------|
| 1 | Criar autor com sucesso        | `POST`   | `/autores`    | `{"nome":"Eça de Queirós","nacionalidade":"Portuguesa"}`  | 201      |
| 2 | Criar autor sem nome           | `POST`   | `/autores`    | `{"nacionalidade":"Portuguesa"}`                          | 400      |
| 3 | Criar autor com nome curto     | `POST`   | `/autores`    | `{"nome":"AB","nacionalidade":"Portuguesa"}`              | 400      |
| 4 | Criar autor sem nacionalidade  | `POST`   | `/autores`    | `{"nome":"Eça de Queirós"}`                               | 400      |
| 5 | Listar autores                 | `GET`    | `/autores`    | —                                                         | 200      |
| 6 | Buscar autor existente         | `GET`    | `/autores/1`  | —                                                         | 200      |
| 7 | Buscar autor inexistente       | `GET`    | `/autores/999`| —                                                         | 404      |
| 8 | Atualizar autor                | `PUT`    | `/autores/1`  | `{"nome":"Novo Nome","nacionalidade":"Brasileira"}`        | 200      |
| 9 | Apagar autor sem livros        | `DELETE` | `/autores/:id`| —                                                         | 200      |
| 10| Apagar autor com livros        | `DELETE` | `/autores/1`  | —                                                         | 409      |

### Livros

| #  | Cenário                          | Método   | Rota           | Body                                                              | Esperado |
|----|----------------------------------|----------|----------------|-------------------------------------------------------------------|----------|
| 11 | Criar livro com sucesso          | `POST`   | `/livros`      | `{"titulo":"Os Maias","ano":1888,"autor_id":1,"isbn":"978-000-0001"}` | 201  |
| 12 | Criar livro sem titulo           | `POST`   | `/livros`      | `{"ano":1888,"autor_id":1,"isbn":"978-000-0002"}`                 | 400      |
| 13 | Criar livro com ano em texto     | `POST`   | `/livros`      | `{"titulo":"Teste","ano":"abc","autor_id":1,"isbn":"978-000-0003"}` | 400    |
| 14 | Criar livro com ano futuro       | `POST`   | `/livros`      | `{"titulo":"Teste","ano":2099,"autor_id":1,"isbn":"978-000-0004"}` | 400     |
| 15 | Criar livro com autor inexistente| `POST`   | `/livros`      | `{"titulo":"Teste","ano":2000,"autor_id":999,"isbn":"978-000-0005"}` | 400   |
| 16 | Criar livro com ISBN duplicado   | `POST`   | `/livros`      | (mesmo isbn de livro existente)                                   | 409      |
| 17 | Listar livros                    | `GET`    | `/livros`      | —                                                                 | 200      |
| 18 | Filtrar por ano                  | `GET`    | `/livros?ano=1995` | —                                                             | 200      |
| 19 | Filtrar por titulo               | `GET`    | `/livros?titulo=cegueira` | —                                                      | 200      |
| 20 | Buscar livro existente           | `GET`    | `/livros/1`    | —                                                                 | 200      |
| 21 | Buscar livro inexistente         | `GET`    | `/livros/999`  | —                                                                 | 404      |
| 22 | Listar livros de um autor        | `GET`    | `/autores/1/livros` | —                                                            | 200      |
| 23 | Listar livros de autor inexistente | `GET`  | `/autores/999/livros` | —                                                          | 404      |
| 24 | Atualizar livro                  | `PUT`    | `/livros/1`    | `{"titulo":"Novo Titulo","ano":1995,"autor_id":1,"isbn":"978-972-23-1956-0"}` | 200 |
| 25 | Apagar livro                     | `DELETE` | `/livros/1`    | —                                                                 | 200      |

---

## 🗃️ Queries SQL para validação manual

```sql
-- Ver todos os autores
SELECT * FROM autores;

-- Ver todos os livros
SELECT * FROM livros;

-- JOIN: livros com nome do autor
SELECT l.id, l.titulo, l.ano, l.isbn, a.nome AS autor, a.nacionalidade
FROM livros l
JOIN autores a ON l.autor_id = a.id;

-- Verificar ISBN duplicado
SELECT isbn, COUNT(*) AS total
FROM livros
GROUP BY isbn
HAVING total > 1;

-- Verificar livros com autor_id inválido
SELECT l.*
FROM livros l
LEFT JOIN autores a ON l.autor_id = a.id
WHERE a.id IS NULL;

-- Contar livros por autor
SELECT a.nome, COUNT(l.id) AS total_livros
FROM autores a
LEFT JOIN livros l ON l.autor_id = a.id
GROUP BY a.id;

-- Livros de um autor específico
SELECT * FROM livros WHERE autor_id = 1;

-- Filtrar por ano
SELECT * FROM livros WHERE ano = 1995;

-- Filtrar por título (parcial)
SELECT * FROM livros WHERE titulo LIKE '%Cegueira%';
```

---

## 🏋️ Exercícios práticos

O ficheiro [`EXERCICIOS.md`](./EXERCICIOS.md) contém **70 exercícios sem respostas** organizados em 7 módulos:

| Módulo | Tema                                  | Exercícios |
|--------|---------------------------------------|------------|
| 1      | Autores — operações básicas           | 1 – 14     |
| 2      | Livros — operações básicas            | 15 – 31    |
| 3      | Filtros e queries                     | 32 – 40    |
| 4      | Validações de formato e body          | 41 – 46    |
| 5      | Validações diretas no banco SQLite    | 47 – 58    |
| 6      | Cenários de fluxo completo            | 59 – 63    |
| 7      | Respostas e contratos HTTP            | 64 – 70    |

---

## 🛠️ Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)

---

## 📄 Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).
