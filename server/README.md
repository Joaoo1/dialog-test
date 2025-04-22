# API Feed

Esta é a API desenvolvida para o Feed, feito utilizando NodeJS. A documentação detalhadas dos endpoints da API se encontra em [API Feed](https://api-dialog.utamo.com.br/docs/).

## 📁 Estrutura de pastas da API
```
    └── 📁docker     # Arquivos utilizados nos containers docker
    └── 📁tests      # Testes de integração
    └── 📁src        # Código da aplicação
```

Todo o código da API se encontra dentro da pasta `src`, que possui a seguinte estrutura:

```
    └── 📁src
        └── 📁common
        └── 📁database
        └── 📁modules
        └── 📁server
```
Explicação do intuito de cada pasta:

- **modules**: Esta é a pasta onde se encontra toda a regra de negócio da aplicação, utilizando aqui um estrutura inspirada no DDD, onde quebramos a aplicação em domínios. Dessa forma, cada pasta dentro dessa é um domínio totalmente independente e desacoplado dos outros. Optei por manter uma estrutura simples dentro de cada módulo, então a organização das pastas de cada módulo é basicamente separado por tipos de arquivo.

- **common**: Esta é a pasta que se encontra arquivos diversos, que não possuem regra de negócio, e são compartilhados entre todos os módulos, para seguir aqui o princípio DRY e evitar repetição de código.

- **database**: O nome é auto explicativo, contém todos os arquivos relacionados a parte de infraestrutura do banco de dados, ou seja, como se conectar com o banco, como criar as tabelas, etc. 

- **server** - E por fim, temos a pasta server que contém todos os arquivos pertinentes ao servidor HTTP que está rodando. 

## 💭 Motivação das escolhas de tecnologia
Vou deixar aqui um pouco por trás do meu pensamento ao escolher algumas tecnologias utilizadas nesse projeto:

- **Express**: Para mim atualmente existem duas escolhas plausíveis para ferramenta de servidor HTTP no node, sendo elas, express e fastify. As únicas ocasiões onde eu escolheria Fastify ao invés de express seria num projeto onde performance é um ponto critico e cada milissegundo faz diferença, pois é sabido através de benchmarks que o fastify é um pouco mais performático que o Express. Ou numa empresa onde existem outras APIs já criadas com fastify, então seria bom manter o padrão de tecnologia entre os projetos para ajudar na manutenção. E por fim, num time onde a maioria é expert em fastify, dessa forma faria sentido escolher a tecnologia. Fora esses casos, eu sempre escolheria express para uma API, pois é uma tecnologia muito bem testada (foi lançada quase junto com o próprio node), que possui uma comunidade muito grande e tem muito conteúdo na ajudar no desenvolvimento e manutenção.

- **Kysely**: No início da minha carreira só utilizava ORMs, aumentava muito produtividade e fazia as coisas quase que de forma mágica na época. Mas com o passar do tempo fui tendo a oportunidade de trabalhar em projetos maiores que exigiam consultas e operações no SQL mais complexas, e por muitas vezes me peguei em situações onde o ORM estava mais me atrapalhando do que ajudando. Por esse motivo, atualmente estou optando por utilizar Query Builders, onde seria um meio termo entre a alta camada de abstração de um ORM e o SQL puro, me dando mais liberdade de controlar e entender o que está acontecendo. E o escolhido aqui foi o Kysely pelo fato dele ter uma ótima integração com o typescript, facilitando muito no desenvolvimento, e também por ter um comunidade bem grande para dar suporte.  

- **Postgres**: Em questão de bancos de dados, possuo experiência com PostgreSQL e MySQL, não tendo uma preferência clara entre os dois, então para escolher um dois seguiria mesma linha de raciocínio do express, de manter padronização entre projetos e considerar expertise do time. Agora desconsiderando contexto de time e empresa (caso desse projeto), eu tendo a escolher o PostgresQL pela disponibilidade de recursos avançados como suporte nativo a JSON e arrays. 

- **Zod**: Para mim atualmente a melhor opção de validador de dados que temos quando o assunto é typescript é o Zod. Ele possui alta integração com typescript, consegue gerar tipos dinâmicos conforme teus schemas, evitando ter que ficar duplicando código, e é muito simples e intuito de usar.

- **Jest e SuperTest**: Confesso que nunca me aventurei muito nas tecnologias de testes do node. Todas as APIs em node que trabalhei eram testadas com Jest, e sempre funcionou muito bem. Até cheguei a testar o vitest em alguns projetos, mas acabei tendo problemas de integração com o typescript e voltei pro Jest mesmo. O mesmo vale para o supertest, foi a única ferramente até o momento que usei para fazer testes de integração, mas que funciona muito bem, e é simples de utilizar. 

- **Socket.IO**: Utilizei o Socket.IO para lidar com a parte de WebSocket. Essa foi minha opção pela simplicidade de integração com o Express e sua robustez, sendo uma ferramenta que me entrega prontinho todas as funcionalidades que atende a maior parte das aplicações que usam WebSocket.