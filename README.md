# Desafio Dialog - Feed de noticías

Esta é o código do desafio realizado pela Dialog. A documentação detalhada de cada parte do sistema encontra-se no README.md da sua respectiva pasta.

## 📁 Estrutura de pastas
O app foi dividido em duas partes, dessa forma:

```
    └── 📁server    # Back-end em node
    └── 📁client    # Front-end em React
```

## 🔧 Executando o projeto
### Pré-requisitos para executar localmente

Antes de começar, você vai precisar ter instalado em sua máquina a seguinte ferramenta:

**[Docker](https://www.docker.com)**

### Executando o projeto localmente

```bash
# Crie um arquivo .env na pasta server com base no ./server/.env.test. 
# As variáveis DB_PORT precisam ser diferentes em cada arquivo env e DEVEM ser as mesmas que estão na porta exposta dos containers no arquivo docker-compose.yml. 
# Onde encontrar a porta exposta no docker-compose.yml:

    ports:
        - ${PORTA_EXPOSTA}:5432


# Suba os containers no docker 
docker compose up -d
```
