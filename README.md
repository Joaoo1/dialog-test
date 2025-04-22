<p align="center">
   <img src="./client/src/assets/full-logo.png" alt="Proffy" width="250"/>
</p>

# Desafio Dialog - Pleno

Esta é o código do desafio realizado pela Dialog. A documentação detalhada de cada parte do sistema encontra-se no README.md da sua respectiva pasta.

O Feed é uma app onde os usuários podem criar posts e curtir os posts de outras pessoas, e também é possível excluir ou "descurtir" um post. 
O app também conta com funcionalidades de cadastro, login e atualização dos dados de perfil, assim como a senha. 
E por fim, a aplicação conta com informações em tempo real, tanto para novos posts, quanto para os likes.

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
# Crie um arquivo .env na pasta client com base no ./client/.env.example
#
# Crie um arquivo .env na pasta server com base no ./server/.env.example
# As variáveis DB_PORT precisam ser diferentes entre os arquivos .env e .env.test.
# A porta colocada no env DEVE ser as mesma que está exposta no container no arquivo docker-compose.yml. 
# Onde encontrar a porta exposta do container no docker-compose.yml:

    ports:
        - ${PORTA_EXPOSTA}:5432


# Suba os containers no docker 
docker compose up -d
```
