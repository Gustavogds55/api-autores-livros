# Exercícios Práticos — API Autores & Livros

> Usa o Postman para os exercícios de API e o terminal (`sqlite3 treino.db`) para os de SQL.
> Não há respostas aqui — testa, observa e valida por conta própria.

---

## Módulo 1 — Autores: operações básicas

1. Faz uma requisição para listar todos os autores. Quantos existem? Qual o formato da resposta?

2. Busca o autor com id `4`. Que campos são retornados?

3. Busca um autor com um id que não existe, por exemplo `999`. Que status HTTP recebes? Qual a mensagem?

4. Cria um novo autor com nome e nacionalidade válidos. Que status HTTP é retornado? O novo autor tem um `id` atribuído?

5. Cria um autor enviando apenas o campo `nacionalidade`, sem `nome`. O que acontece?

6. Cria um autor com `nome` igual a `"AB"` (menos de 3 caracteres). A API aceita?

7. Cria um autor com `nome` igual a `"AB "` (com espaço no final). A API aceita? O espaço é guardado?

8. Cria um autor sem enviar nenhum campo no body. Que erro recebes?

9. Cria um autor sem o campo `nacionalidade`. Que erro recebes?

10. Atualiza o autor com id `4` com dados válidos. O que muda na resposta?

11. Tenta atualizar um autor que não existe. Que status recebes?

12. Apaga um autor que não tem livros associados. Que status e mensagem recebes?

13. Tenta apagar um autor que tem livros associados. O que acontece? Que status é retornado?

14. Tenta apagar o mesmo autor duas vezes seguidas. O que acontece na segunda tentativa?

---

## Módulo 2 — Livros: operações básicas

15. Lista todos os livros. Quantos existem após o seed?

16. Busca o livro com id `6`. Que campos são retornados?

17. Busca um livro com id `999`. Que status e mensagem recebes?

18. Cria um livro com todos os campos válidos. Que status é retornado?

19. Cria um livro sem o campo `titulo`. O que acontece?

20. Cria um livro com o campo `ano` preenchido com texto, por exemplo `"abc"`. A API aceita?

21. Cria um livro com `ano` igual a `2099`. A API aceita? Porquê?

22. Cria um livro com `ano` igual ao ano atual. A API aceita?

23. Cria um livro com um `autor_id` que não existe na tabela autores, por exemplo `999`. Que erro recebes?

24. Cria dois livros com o mesmo `isbn`. O que acontece na segunda criação? Que status é retornado?

25. Cria um livro sem o campo `isbn`. O que acontece?

26. Cria um livro sem o campo `autor_id`. O que acontece?

27. Atualiza um livro existente com dados válidos. A resposta reflete os novos dados?

28. Atualiza um livro e usa um `isbn` que já pertence a outro livro. A API aceita?

29. Atualiza um livro mantendo o mesmo `isbn` que já tinha. A API aceita? Porquê?

30. Apaga um livro existente. Que status e mensagem recebes?

31. Tenta apagar um livro que já foi apagado. O que acontece?

---

## Módulo 3 — Filtros e queries

32. Filtra os livros pelo ano `1995`. Quantos resultados aparecem?

33. Filtra os livros pelo ano `1800`. Há resultados? Que formato tem a resposta quando o array está vazio?

34. Filtra os livros pelo título `cegueira` (minúsculas). A pesquisa é case-insensitive?

35. Filtra os livros pelo título `CEGUEIRA` (maiúsculas). O resultado é o mesmo que o exercício anterior?

36. Combina os dois filtros: `?ano=1995&titulo=ensaio`. Quantos resultados aparecem?

37. Faz um GET `/livros?ano=abc`. A API retorna erro ou uma lista vazia?

38. Lista os livros do autor com id `4`. Quantos livros tem esse autor?

39. Lista os livros de um autor que não existe, por exemplo `/autores/999/livros`. Que status recebes?

40. Lista os livros de um autor que existe mas não tem livros associados. Que formato tem a resposta?

---

## Módulo 4 — Validações de formato e body

41. Envia um POST `/autores` com o body completamente vazio `{}`. O que acontece?

42. Envia um POST `/livros` com o body completamente vazio `{}`. Que campo é reportado primeiro no erro?

43. Envia um POST com `Content-Type` errado (sem definir `application/json`). O body é lido corretamente?

44. Envia um `ano` como string numérica, por exemplo `"1995"` em vez de `1995`. A API aceita?

45. Envia um `autor_id` como string, por exemplo `"1"` em vez de `1`. A API aceita?

46. Envia campos extra no body que não existem na tabela, por exemplo `"genero": "romance"`. A API ignora ou retorna erro?

---

## Módulo 5 — Validações diretas no banco SQLite

> Abre o banco com: `sqlite3 treino.db`

47. Corre `SELECT * FROM autores;` — os dados do seed estão todos presentes?

48. Corre `SELECT * FROM livros;` — quantos livros existem? Os `autor_id` são válidos?

49. Faz o JOIN entre livros e autores para ver o nome do autor em cada livro. Todos os livros têm autor?

50. Verifica se existe algum ISBN duplicado na tabela livros usando `GROUP BY` e `HAVING`.

51. Verifica se existe algum livro com `autor_id` que não corresponde a nenhum autor (LEFT JOIN com WHERE a.id IS NULL).

52. Conta quantos livros cada autor tem. Algum autor tem zero livros?

53. Filtra os livros diretamente no banco pelo ano `1995`. O resultado bate com o da API?

54. Filtra os livros pelo título com `LIKE '%Cegueira%'`. O resultado bate com o da API?

55. Após apagares um livro pela API, confirma no banco que o registo foi mesmo removido.

56. Após apagares um autor pela API, confirma no banco que o registo foi mesmo removido.

57. Tenta inserir diretamente no banco um livro com um `autor_id` inexistente:
    ```sql
    INSERT INTO livros (titulo, ano, autor_id, isbn) VALUES ('Teste', 2000, 9999, 'isbn-direto-1');
    ```
    O banco permite? Porquê (ou porquê não)?

58. Tenta inserir diretamente no banco dois livros com o mesmo `isbn`. O banco permite?

---

## Módulo 6 — Cenários de fluxo completo

59. Cria um autor novo → cria um livro para esse autor → lista os livros do autor → apaga o livro → apaga o autor. Todos os passos funcionam na ordem correta?

60. Cria um autor → cria dois livros para esse autor → tenta apagar o autor. O que acontece? Apaga os dois livros → tenta apagar o autor novamente. Agora funciona?

61. Cria um livro com um ISBN → tenta criar outro livro com o mesmo ISBN → atualiza o primeiro livro com um ISBN diferente → tenta criar o segundo livro com o ISBN original. Agora é possível?

62. Faz um GET `/autores` antes e depois de criar um autor. O array cresceu?

63. Faz um GET `/livros` antes e depois de apagar um livro. O array diminuiu?

---

## Módulo 7 — Respostas e contratos

64. Verifica que todos os endpoints de sucesso retornam sempre `"success": true` no body.

65. Verifica que todos os endpoints de erro retornam sempre `"success": false` e um campo `"message"`.

66. Confirma que um POST bem-sucedido retorna status `201` e não `200`.

67. Confirma que um PUT bem-sucedido retorna status `200`.

68. Confirma que um DELETE bem-sucedido retorna status `200`.

69. Confirma que um recurso não encontrado retorna sempre status `404`.

70. Confirma que um erro de validação retorna sempre status `400`.
