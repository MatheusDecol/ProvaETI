# CRUD Personagens e Itens Mágicos 🧙‍♂️

Este projeto simula a gestão de personagens e seus itens mágicos com base nos requisitos da Avaliação Prática sobre CRUD usando Programação Orientada a Objetos.

## ✅ Funcionalidades

- ✅ Cadastrar personagem  
- ✅ Cadastrar item mágico  
- ✅ Listar personagens  
- ✅ Buscar personagem por ID  
- ✅ Atualizar nome do aventureiro por ID  
- ✅ Remover personagem  
- ✅ Adicionar item ao personagem  
- ✅ Listar itens por personagem  
- ✅ Remover item do personagem  
- ✅ Listar todos os itens mágicos  
- ✅ Buscar item mágico por ID  
- ✅ Buscar amuleto do personagem  

## 💻 Tecnologias

- HTML
- CSS
- JavaScript (orientado a objetos)
- `localStorage` para persistência de dados

## 🧠 Regras de Negócio Aplicadas

- Um personagem só pode possuir **1 amuleto**.
- A soma da **força + defesa de um personagem** deve ser **exatamente 10**.
- Itens do tipo **"Arma"** devem ter **defesa = 0**.
- Itens do tipo **"Armadura"** devem ter **força = 0**.
- Um item **não pode** ter **força e defesa iguais a 0**.
- A **força e a defesa** de um item devem estar entre **0 e 10**.

## 🗂️ Estrutura do Projeto

📦 ProvaETI
|
├── views/
│   └── prova.html            # Interface principal do CRUD
├── scripts/
│   └── prova.js            # Lógica e funcionalidades em JavaScript (POO)
├── styles/
│   └── prova.css           # Estilização da interface
└── README.md               # Arquivo de documentação


## 🚀 Como usar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Cadastre personagens, adicione itens, e utilize as funcionalidades de busca, edição e exclusão diretamente na interface.

## 📚 Conceitos Trabalhados

- Programação Orientada a Objetos com JavaScript
- Validação de entrada e tratamento de erros
- Manipulação de DOM
- Armazenamento local de dados com `localStorage`
- Estruturação de código limpa e modular


**Aluno:** Matheus Decol da Silva Dantas  
**Disciplina:** Imersão Profissional: Fábrica de Software  
**Professor:** Eduardo Bonam Rissardi
