# Deabreu Veículos

O Deabreu Veículos é uma solução completa para gestão de veículos, incluindo API, painel administrativo e loja virtual. O sistema permite o cadastro, edição, exclusão e controle de status de venda dos veículos, além de gerenciamento de marcas e imagens. Conta com autenticação de usuários e interface moderna para administração e exibição dos veículos.

## Estrutura do Projeto

- **deabreuapi/**: API desenvolvida em Laravel para gerenciamento de veículos, marcas e usuários.  
  Responsável por fornecer endpoints RESTful para o painel e a loja.
- **deabreupainel/**: Painel administrativo desenvolvido em Next.js + TypeScript.  
  Permite o cadastro, edição, exclusão e gerenciamento de veículos e marcas, além do controle de status de venda dos veículos.
- **deabreustore/**: Loja virtual desenvolvida em Next.js.  
  Exibe os veículos disponíveis para venda ao público final.


## Principais Funcionalidades

- Cadastro, edição e exclusão de veículos e marcas.
- Upload e gerenciamento de imagens dos veículos e logos das marcas.
- Controle de status de venda dos veículos (vendido/não vendido).
- Listagem de veículos disponíveis e vendidos.
- Autenticação de usuários para acesso ao painel.

## Como rodar o projeto com Docker

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### Passos para rodar

1. **Clone o repositório:**
   git clone https://github.com/patrickpierre1/DeabreuVeiculos.git
   cd DeabreuVeiculos 

2. **Copie o arquivo de variáveis de ambiente para a API:**
   - cp deabreuapi/.env.example deabreuapi/.env
   - Edite o .env se necessário (ex: APP_KEY, configurações de banco, etc)

3. **Suba os containers**
   - docker-compose up -d

4. **Acesse o container da API para rodar as migrations e criar o link de storage**

   - docker exec -it DeabreuApi bash
   - php artisan migrate
   - php artisan storage:link
   - exit

5. **Acesse os serviços**
   - API: http://localhost:8000
   - Painel Administrativo: http://localhost:3001
   - Loja Virtual: http://localhost:3000 


6. **Comandos Úteis**
    - docker-compose up --d
    - docker-compose down
    - docker exec -it DeabreuApi bash
    - php artisan migrate
    - php artisan storage:link


7. **Tecnologias Utilizadas**
   - Backend: Laravel, PHP, MySQL
   -  Frontend: Next.js, React, TypeScript, Material UI, TailwindCSS
   - Docker
