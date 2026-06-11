# CRUD Mobile com React Native, Expo e Backend Próprio

Este repositório contém um aplicativo mobile simples desenvolvido com **React Native** e **Expo**, integrado a um backend próprio para realizar um CRUD de tarefas.

O projeto foi desenvolvido como atividade individual da disciplina de mobile da faculdade SENAC-PE.

## Tema do projeto

O tema escolhido foi um **gerenciador de tarefas**.

O aplicativo permite:

- cadastrar tarefas;
- listar tarefas cadastradas;
- editar informações de uma tarefa;
- excluir tarefas.

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- API REST própria com Node.js e Express

## Backend utilizado

O aplicativo consome a API publicada no Render:

```txt
https://gerenciador-de-tarefas-1-w2dz.onrender.com
```

Rotas principais utilizadas pelo aplicativo:

- `GET /tasks` - lista todas as tarefas;
- `POST /tasks` - cadastra uma nova tarefa;
- `PUT /tasks/:id` - edita uma tarefa existente;
- `DELETE /tasks/:id` - exclui uma tarefa.

## Observação sobre a versão do Expo

Este projeto foi configurado com:

```txt
Expo 54.0.2
React 19.1.0
React Native 0.81.5
```

Essa versão foi utilizada para manter compatibilidade com a versão do **Expo Go** disponível no celular usado para testes.

Caso o Expo sugira atualizar para uma versão mais recente, não é necessário atualizar para executar este projeto.

## Como executar o projeto

Acesse a pasta do aplicativo:

```bash
cd mobile
```

Instale as dependências:

```bash
npm install
```

Execute o projeto com Expo:

```bash
npx expo start --clear
```

Depois, abra o aplicativo **Expo Go** no celular e escaneie o QR Code exibido no terminal ou no navegador.

## Estrutura principal

```txt
mobile/
  App.js
  app.json
  package.json
```

O arquivo `App.js` contém a tela principal do aplicativo, com o formulário de cadastro/edição e a listagem das tarefas.

## Objetivo da atividade

O objetivo principal foi desenvolver uma aplicação mobile funcional, capaz de consumir dados de uma API própria, aplicando os conceitos de CRUD em um aplicativo simples com React Native e Expo.
