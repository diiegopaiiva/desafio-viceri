# Desafio FullStack - Node.js e Angular

## Proposta

Este repositório contém os desafios de backend e frontend para a criação de um aplicativo de tarefas (TO-DO) desenvolvido em Node.js para o backend e Angular para o frontend. Abaixo estão os detalhes e instruções para cada parte do desafio.

## Desafio Backend - Node.js

### Proposta

O objetivo deste desafio é a criação de uma API REST básica para um aplicativo de tarefas (TO-DO).

### Requisitos

1. **Cadastro de um novo usuário**
   - A API deve receber o nome, e-mail e senha do usuário para realizar a criação do usuário.
   - A senha deve ser armazenada na forma de hash.
   - Deve ser gerado automaticamente um ID para o usuário.
   - Não deve permitir criar dois usuários com o mesmo e-mail.

2. **Inclusão de uma nova tarefa**
   - A API deve receber a descrição da tarefa e a prioridade (Alta, Média, Baixa).
   - O usuário não deve ser passado no JSON da requisição, mas obtido através do token de acesso do usuário.
   - Deve ser gerado automaticamente um ID para a tarefa criada.

3. **Listar as tarefas pendentes**
   - A API deve retornar a lista de tarefas pendentes de um usuário.
   - O usuário deve ser identificado pelo token de autenticação.

4. **Autenticação do usuário por meio de e-mail e senha**
   - A API deve receber o e-mail do usuário e a senha. O sistema deve procurar o usuário pelo e-mail e validar a senha.
   - Após a verificação das credenciais, deve ser gerado um token de acesso (preferencialmente JWT).

### Segurança

- A API não deve permitir acesso a nenhuma funcionalidade sem autenticação, exceto login e cadastro.

### Requisitos Técnicos

- **Plataforma:** A API deve ser desenvolvida em Node.js.
- **Banco de dados:** Pode ser utilizado um banco de dados em memória (ex: SQLite).
- **Build e Execução:** Adicionar informações no README do código fonte para rodar a aplicação em ambiente local, build e deploy da aplicação.
- **Código fonte:** O código fonte deve ser disponibilizado no GitHub.
- **Testes unitários:** Deverá existir testes unitários cobrindo pelo menos 50% do código fonte disponibilizado.

### Ferramentas e Tecnologias Sugeridas

- **Framework:** Express.js
- **Autenticação:** JWT
- **Documentação:** Swagger
- **Testes:** Jest

## Desafio Frontend - Angular

### Proposta

O objetivo deste desafio é a criação de uma aplicação Angular para consumir a API de tarefas (TO-DO) desenvolvida no backend.

### Requisitos

1. **Tela de Cadastro de Usuário**
   - Um formulário para o usuário inserir nome, e-mail e senha.
   - Validação dos campos do formulário.

2. **Tela de Login**
   - Um formulário para o usuário inserir e-mail e senha.
   - Validação dos campos do formulário.

3. **Tela de Lista de Tarefas**
   - Exibir a lista de tarefas pendentes do usuário.
   - Exibir um botão para marcar a tarefa como concluída.

### Requisitos Técnicos

- **Plataforma:** A aplicação deve ser desenvolvida em Angular.
- **Estilização:** Utilizar CSS básico.
- **Comunicação com a API:** Utilizar HttpClientModule para realizar as requisições HTTP.

### Ferramentas e Tecnologias Sugeridas

- **Framework:** Angular 12+
- **Estilização:** CSS

## Desafio Publicação

### Proposta

E se você precisar disponibilizar essa aplicação na AWS? Descreva brevemente como o faria.

### Publicação na AWS

Para disponibilizar a aplicação na AWS, seguiria os seguintes passos:

1. **Configurar a API Backend no AWS Elastic Beanstalk:**
   - Criar um ambiente no Elastic Beanstalk para a aplicação Node.js.
   - Configurar a aplicação para conectar ao banco de dados SQLite.
   - Realizar o deploy da aplicação no Elastic Beanstalk.

2. **Configurar a Aplicação Frontend no AWS S3 e CloudFront:**
   - Build da aplicação Angular.
   - Fazer o upload dos arquivos de build para um bucket S3.
   - Configurar o bucket S3 para hospedagem estática.
   - Configurar o CloudFront para distribuir o conteúdo do bucket S3, melhorando a performance e a segurança.

3. **Configurar o AWS RDS para um Banco de Dados Persistente (Opcional):**
   - Criar uma instância do RDS para substituir o banco de dados SQLite por um banco de dados mais robusto e persistente.
   - Configurar a aplicação Node.js para se conectar ao banco de dados RDS.

4. **Configuração do DNS:**
   - Utilizar o Route 53 para gerenciar o DNS e apontar o domínio para o CloudFront.

### Execução Local

Para rodar a aplicação em ambiente local, siga as instruções abaixo:

1. **Backend:**
   ```bash
   # Instalar as dependências
   npm install
   
   # Rodar a aplicação
   npm start
   ```

2. **Frontend:**
   ```bash
   # Instalar as dependências
   npm install
   
   # Rodar a aplicação
   ng serve
   ```

Para mais detalhes, consulte a documentação específica de cada parte do projeto.