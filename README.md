
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

## Generate GraphQL Code

```bash
$ yarn ts-node src/generate-types
```