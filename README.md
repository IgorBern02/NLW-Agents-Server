# 🧠 NLW Agents - Server

Este é o backend do projeto **NLW Agents**, desenvolvido durante a trilha de Node.js no evento **NLW (Next Level Week)** da Rocketseat.

Ele é responsável por fornecer a API para o frontend, incluindo rotas, autenticação e conexão com o banco de dados PostgreSQL com suporte a vetores via **pgvector**.

---

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [Zod](https://zod.dev/) (validação de esquemas)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [pgvector](https://github.com/pgvector/pgvector) (suporte a IA/vetores)
- [Docker](https://www.docker.com/) (ambiente de banco de dados)

---

## 📁 Estrutura do projeto

NLW-Agents-Server/
├── docker/ # Scripts de setup do banco
├── drizzle/ # Migrations do banco
├── src/
│ ├── env.ts # Configurações de ambiente
│ ├── http/
│ │ └── routes/ # Rotas da API
│ └── lib/ # Conexão com banco e outros utilitários
├── .env # Variáveis de ambiente
├── .gitignore
├── package.json
└── tsconfig.json

---

## 🛠️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/IgorBern02/NLW-Agents-Server.git
# cd NLW-Agents-Server
```

### 2. Configure as variáveis de ambiente

Crie um arquivo .env na raiz e adicione:

```bash
# HTTP
PORT=3333

# DATABASE
DATABASE_URL=postgres://docker:docker@localhost:5432/agents
```

### 3. Suba o banco de dados com Docker

```bash
docker compose up -d
```

### 4. Instale as dependências

```bash
npm install
```

### 5. Rode as migrations

```bash
npx drizzle-kit push
```

### 6. Inicie o servidor

```bash
npm run dev
```

Servidor rodando em: http://localhost:3333

📌 Requisitos

Node.js 18+
Docker e Docker Compose
PostgreSQL (gerenciado via Docker)

✍️ Autor
Feito por @IgorBern02 no evento NLW da Rocketseat.
