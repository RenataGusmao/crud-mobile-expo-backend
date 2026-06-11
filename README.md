# CRUD Mobile com React Native, Expo e Backend Próprio 

Este repositório foi desenvolvido como atividade individual da disciplina de mobile na faculdade SENAC-PE, com o objetivo de criar um aplicativo mobile simples utilizando React Native com Expo, integrado a um backend próprio para realização de um CRUD simples.

## Tema do projeto

O tema escolhido para o CRUD foi o **cadastro de tarefas**.

O aplicativo permite:

* cadastrar tarefas;
* listar tarefas cadastradas;
* editar informações de uma tarefa;
* excluir tarefas.

## Tecnologias utilizadas

### Mobile

* React Native
* Expo
* JavaScript

### Backend

* Node.js
* Express
* JavaScript

## Organização do backend

O backend foi organizado com separação mínima de responsabilidades:

* `routes`: definição das rotas da API;
* `controllers`: regras responsáveis por processar as requisições;
* `models`: estrutura dos dados utilizados no CRUD.

## Rotas principais da API

* `GET /tasks` — lista todas as tarefas;
* `POST /tasks` — cadastra uma nova tarefa;
* `PUT /tasks/:id` — edita uma tarefa existente;
* `DELETE /tasks/:id` — exclui uma tarefa.

## Como executar o projeto

### Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Execute o servidor:

```bash
npm start
```

### Mobile

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
npx expo start
```

## Objetivo da atividade

O objetivo principal foi desenvolver uma aplicação mobile funcional, capaz de consumir dados de uma API própria, aplicando os conceitos de CRUD e organização básica de backend.
