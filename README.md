## Autodromo Performance Dashboard

> Dashboard de acompanhamento de performance dos sites do Autodromo.

### Stack

- Typescript
- Fastify
- BullMQ
- Redis
- TimescaleDB (PostgreSQL)

## Desenvolvendo no ambiente local

- Clone o repositório:
  `git clone https://github.com/<slug-da-conta>/autodromo-performance-dashboard-api.git`
- Entre no diretório do projeto:
  `cd autodromo-performance-dashboard-api`
- Configure as variáveis de ambiente;
- Execute o build com o Docker:
  `docker-compose -f docker-compose.dev.yml up --build`;
- Abra o endereço localhost na rota "/docs" e confira se a aplicação está funcionando corretamente. Uma outra opção é rodar o comando `docker-compose logs -f` ou o abrir o Docker Desktop para verificar os logs.

## Deploy (AWS)

- Crie a instância da EC2;
- Conecte no console;
- Atualize o sistema:
  `sudo apt update && sudo apt upgrade -y`
- Instale o Docker:
  `sudo apt install docker.io docker-compose git -y`
- Clone o repositório:
  `git clone https://github.com/<slug-da-conta>/autodromo-performance-dashboard-api.git`
- Entre no diretório do projeto:
  `cd autodromo-performance-dashboard-api`
- Configure as variáveis de ambiente;
- Execute o build com o Docker:
  `docker-compose -f docker-compose.prod.yml up --build`;
- Abra o endereço público da instância na rota "/docs" e confira se a aplicação está funcionando corretamente. Uma outra opção é rodar o comando `docker-compose -f docker-compose.prod.yml logs -f` para verificar os logs.
