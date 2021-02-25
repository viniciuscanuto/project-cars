# Project Cars
  Api para realizar um CRUD de carro completo e manter os dados no mongodb

### Features
- [x] Cadastro de Carro
- [x] Visualizar Carro pela id
- [x] Visualizar Carros
- [x] Visualizar Carros através de filtros
- [x] Alterar Carro
- [x] Remover Carro

### Pré-requisitos
  Para rodar a api é necessário a instalação das seguintes ferramentas:
  - Git 
  - Node -> versão 12.16.1
  - Mongodb -> versão 4.4.3

### Executar o Servidor

```bash
# Clonar este repositório
$ git clone https://github.com/viniciuscanuto/project-cars.git

# Acessar pasta do projeto
$ cd project-cars

# Instalar as dependências
$ npm install

# Executar o servidor
$npm start
```

### Exemplos

* Cadastrar Carro
```javascript
// POST
// Rota: http://localhost:3333/cars
// Campos: Obrigatórios
// Exemplo:
{
  "marca": "Carro 1",
  "model": "sedan",
  "versao": "2.0",
  "ano": 2020,
  "quilometragem": "0 km",
  "tipo_cambio": "automático",
  "preco_de_venda": 28000
}
```

* Visualizar Carros
```javascript
// GET
// Rota: http://localhost:3333/cars
// Exemplo:

  http://localhost:3333/cars
```

* Visualizar Carro pela id
```javascript
// GET
// Rota: http://localhost:3333/cars/:id
// Exemplo:

  http://localhost:3333/cars/603699e3ad69260b20be2a74
```

* Visualizar Carro por filtro
```javascript
// POST
// Rota: http://localhost:3333/cars
// Campos: Opcionais (pode pesquisar por apenas um)
// Exemplo:
{
  "marca": "Carro 1",
  "model": "sedan",
  "versao": "2.0",
  "ano": 2020,
  "quilometragem": "0 km",
  "tipo_cambio": "automático",
  "preco_de_venda": 28000,
  "anoRange": {
    "minimo": 2018,
    "maximo": 2021
  },
  "preco_de_vendaRange": {
    "minimo": 20000,
    "maximo": 30000
  }
}
```

* Alterar Carro
```javascript
// PUT
// Rota: http://localhost:3333/cars/:id
// Campos: Obrigatórios
// Exemplo:
  http://localhost:3333/cars/603699e3ad69260b20be2a74

{
  "marca": "Carro 2",
  "model": "sedan",
  "versao": "2.0",
  "ano": 2018,
  "quilometragem": "100 km",
  "tipo_cambio": "automático",
  "preco_de_venda": 22000
}
```

* Remover Carro
```javascript
// DELETE
// Rota: http://localhost:3333/cars/:id
// Exemplo:

  http://localhost:3333/cars/603699e3ad69260b20be2a74
```

### Tecnologias
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)

### Autor

- Nome: Vinícius Canuto
- Contato: vncscanuto@gmail.com
