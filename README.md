# Refund API

API em **Node.js + Express + TypeScript** para gerenciar usuários/sessões/reembolsos e realizar **upload de imagens**.

- Upload: `POST /uploads`
- Acesso aos arquivos: `GET /uploads/:filename`

---

## Stack

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- Multer (upload)

---

## Requisitos

- Node.js (recomendado **18+**)
- npm

---

## Como rodar

### 1) Instalar dependências

```bash
npm install
```

### 2) (Opcional) Aplicar migrations do Prisma

Se você alterou o schema:

```bash
npx prisma migrate dev
```

### 3) Subir a API

```bash
npm run dev
```

A API sobe na porta:

- `http://localhost:3333`

> Se aparecer erro `EADDRINUSE`, tem outro processo usando a porta 3333. Pare o processo anterior e rode novamente.

---

## Upload de imagem (Insomnia/Postman)

### 1) Fazer upload

**POST** `/uploads`

Body:

- `multipart/form-data`
- campo **obrigatório**: `file` (nome exato)
- tipo do campo: **File**

> Observação: esta rota está protegida por middleware de autorização e requer role `employee`.

### 2) Resposta

Quando dá certo, a API responde JSON com o `filename` salvo:

```json
{ "filename": "<nome-gerado>" }
```

### 3) Acessar a imagem

Os arquivos finais ficam em:

- `tmp/uploads/`

Para acessar:

- **GET** `/uploads/:filename`

Exemplo:

- `GET /uploads/<filename>`

---

## Endpoints principais

- `GET/POST /users` (conforme implementação)
- `GET/POST /sessions` (conforme implementação)
- `GET/POST /refunds` (conforme implementação)
- `POST /uploads` (upload)
- `GET /uploads/:filename` (arquivo estático)

---

## Scripts

- `npm run dev` — inicia a API em desenvolvimento (ts-node)

---

## Observações importantes

- Pastas:
  - `tmp/` (temporário)
  - `tmp/uploads/` (final)
- O servidor serve arquivos estáticos via `express.static` configurado em `/uploads`.

---

Licença: MIT (ajuste se necessário)

