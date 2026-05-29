# Refund API (Node.js + Express + Prisma)

API para gerenciar sessões, usuários, reembolsos e **upload de imagens**.

> Repositório em TypeScript.

---

## 🚀 Pré-requisitos

- **Node.js** (recomendado 18+)
- **npm**
- **Prisma CLI** (instalado via dependências do projeto)
- (Opcional) **Banco SQLite** (o projeto já vem com `prisma/dev.db`)

---

## 📦 Instalação

```bash
npm install
```

---

## 🗄️ Banco de dados (Prisma)

Se precisar aplicar migrations (caso você altere o schema):

```bash
npx prisma migrate dev
```

Para rodar sem mudanças, normalmente não é necessário.

---

## ▶️ Como rodar a API

Em desenvolvimento (usa `ts-node`):

```bash
npm run dev
```

Por padrão, o servidor sobe na porta:

- **http://localhost:3333**

---

## 🧪 Testando upload (Insomnia / Postman)

### 1) Fazer upload (POST)

Endpoint:

- **POST** `/uploads`

Body:

- `multipart/form-data`
- campo: `file` (nome **exato**)
- tipo do campo: **File**

> Observação: essa rota está protegida por middleware de autorização (no seu código, exige usuário com role `employee`).

### 2) Acessar o arquivo (GET)

Após o upload, o arquivo é salvo em:

- `tmp/uploads/`

Você pode servir o arquivo por:

- **GET** `/uploads/:filename`

Exemplo:

- `GET /uploads/<filename>`

---

## 📁 Estrutura de pastas de upload

- `tmp/` → pasta temporária
- `tmp/uploads/` → arquivos já “finalizados”

---

## 🛠️ Logs e erros

Se o upload falhar, confira:

- se a rota `/uploads` está com token/role corretos
- se você está enviando `multipart/form-data` e o campo se chama **file**
- se o servidor está na porta 3333 (evite `EADDRINUSE`)

---

## 📌 Rotas principais

- `/users`
- `/sessions`
- `/refunds`
- `/uploads` (upload + estáticos)

---

## ✅ Scripts

- `npm run dev` → inicia a API em desenvolvimento

---

## Licença

MIT (ou ajuste conforme seu projeto)
