# My Sales 🚀

Uma API backend robusta e eficiente para gerenciamento de vendas, desenvolvida com **TypeScript** e **Node.js**. Este projeto utiliza práticas modernas, como cache com **Redis**, validações com schemas, e testes automatizados, para garantir alta performance e escalabilidade.

---

## 📌 Proposta do Projeto

O objetivo foi criar uma API para gerenciamento de vendas com as seguintes funcionalidades:  
- Gerenciamento de **usuários** e autenticação por tokens.
- Registro e consulta de **ordens de vendas** e **produtos**.
- Relacionamento entre **vendedores**, **produtos** e **ordens**.
- Utilização de **cache** para otimizar buscas frequentes.

---

## 🛠️ Tecnologias Utilizadas

### **Linguagem e Ferramentas**
- **TypeScript**
- **Node.js**
- **Redis**: Cache de alta performance.
- **EditorConfig**: Padronização de código entre diferentes IDEs.
- **ESLint** e **Prettier**: Linters e formatação de código.

### **Banco de Dados**
- **PostgreSQL** (ou outro banco relacional)
- **TypeORM**: Migrations e manipulação de banco de dados.

### **Testes**
- **Jest**: Para testes unitários e de integração.

---

## 🚀 Funcionalidades

### **Modelagem do Banco de Dados**
- **Usuários** (`users`): Informações dos usuários.
- **Tokens de Usuários** (`user_tokens`): Gerenciamento de autenticação.
- **Produtos** (`products`): Registro de itens à venda.
- **Ordens** (`orders`): Registro de vendas realizadas.
- **Ordens de Produtos** (`order_products`): Relacionamento entre ordens e produtos.
- **Vendedores** (`customers`): Informações dos vendedores.

---

### **Linting e Formatação**

ESLint configurado para boas práticas de TypeScript.
Prettier para padronização de estilo.

---

## 🗂️ Estrutura do Banco de Dados

Exemplo de Relações:
- Um usuário pode realizar várias ordens.
- Cada ordem pode incluir vários produtos.
- Vendedores estão associados às ordens que gerenciam.

