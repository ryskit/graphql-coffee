
# GraphQL-Coffee

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Prisma

```
yarn prisma migrate dev --name [file_name]
```

ref: https://www.prisma.io/docs/reference/api-reference/command-reference

## Generate GraphQL Code

Please modify coffee.graphql or create new [***.graphql] If you define GraphQL Schema.

you want to generate TS code from GraphQL Schema, run the below command.

```bash
$ yarn ts-node src/generate-types
```

## Memo

```
nest new graphql-coffee
yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
yarn add ts-morph
yarn ts-node src/generate-types
nest g module coffees
nest g resolver coffees
nest g s coffees

yarn add --dev prisma
yarn add @prisma/client
yarn add @nestjs/config
yarn add class-validator class-transformer
yarn add graphql-subscriptions
yarn add dataloader
```