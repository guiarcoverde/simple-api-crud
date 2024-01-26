# Projeto Node.js de Gerenciamento de Tasks
Este projeto consiste em um servidor Node.js que utiliza bibliotecas internas para criar um ambiente de gerenciamento de tarefas (tasks) com as operações básicas de consulta, criação, atualização e exclusão. O projeto também inclui a capacidade de filtrar tarefas por título e/ou descrição. Além disso, há a implementação de um middleware para transformar o corpo da requisição em JSON e configurar o cabeçalho "Content-Type" como "application/json".

## Estrutura do Projeto
Middleware
Na pasta middlewares, existe um arquivo chamado json.js. Esse middleware é responsável por transformar o corpo da requisição em JSON e definir o cabeçalho "Content-Type" como "application/json".

Utils
Na pasta utils, há dois arquivos:

build-route-params.js: Utiliza expressões regulares (Regex) para identificar se há ou não algum parâmetro na rota.

extract-query-params.js: Extrai informações da query na API.

Streams
Há uma pasta chamada streams que utiliza o conceito de streams do Node.js para ler um arquivo CSV e realizar uma requisição POST baseada no conteúdo do CSV.

Arquivos da Pasta src
database.js: Este script cria um arquivo na pasta raiz chamado "db.json" e executa operações de extração, inserção, exclusão e atualização de dados no JSON.

routes.js: Contém quatro rotas principais:

GET: Permite a consulta de todas as tarefas, com a opção de filtrar por título e/ou descrição.

POST: Cria uma nova tarefa com um ID único gerado pela biblioteca interna RandomUUID. Os campos "createdAt" e "updatedAt" são preenchidos com a data e horário exatos utilizando a biblioteca interna Date.

PUT: Atualiza uma tarefa específica usando o ID como parâmetro. Se a tarefa não existir, um erro 404 é emitido com a mensagem "Task não encontrada". O usuário é obrigado a fornecer o novo título e descrição da tarefa, com verificações para informar caso algum campo esteja faltando.

DELETE: Deleta uma tarefa com base no ID fornecido como parâmetro.

PATCH: Verifica se o campo "completedAt" é null. Se for, o campo é atualizado com a data e horário em que a rota foi chamada.

server.js: O arquivo principal que cria um servidor HTTP usando o módulo http do Node.js. Este servidor utiliza os middlewares json e extractQueryParams, e as rotas definidas no arquivo routes.js são mapeadas e tratadas de acordo com as requisições recebidas.

