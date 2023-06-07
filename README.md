# Breve descrição do projeto

## Principais dependencias do projeto e suas utilizações:

---

**Prisma.io** -> gestão do banco de dados

**bcryptjs** -> criptografia de senha

**dotenv** -> configuração das variaveis de ambiente

**express** -> controle do fluxo de entrada e saída de dados - HTTP

**jsonwebtoken** -> criação e controle do token de acesso do user

**yup** -> validação de dados

**jest** -> realização de testes automatizados (unitários e integração)

**sucrase** -> lib para complização do projeto - deploy

**nodemon** -> auxilia auto reload do projeto no ambiente de dev

## Banco de dados

---

Para a conexão com o Banco de dados é utilizado a ferramenta **Prima.io**

As configurações de acesso ao banco de dados podem ser definidas no arquivo **.env**

Abaixo temos um exemplo:

`DATABASE_URL="postgresql://postgres:root@192.168.1.4:5432/auth_jest_test"`

**postgresql** -> tipo do banco

**postgres** -> usuário

**root** -> senha

**192.168.1.4** -> IP de conexão

**5432** -> porta de conexão

**auth_jest_test** -> nome do banco de dados

## Mrigações e comando

---

Abaixo teremos os principais comandos que gerenciam o banco de dados:

`yarn prisma-run-migrations` -> roda as migrations do banco

`yarn prisma-generate-schema` -> sincroniza o esquema do banco com as mudanças feitas

`yarn prisma-update-intellisense` -> sincroniza o esquema do banco com o intellisense do vscode

`yarn prisma-reset-database` -> Reseta o banco de dados

`yarn prisma-seed` -> popula o banco com os dados de seeds

`yarn prisma-studio` -> Abre uma central de controle de dados - semelhante a um gerenciador de banco de dados
