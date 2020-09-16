# Initialize a truffle project

create new directory and navigate to it with your console

```
$ mkdir web-01 && cd $_
$ truffle init
```

# Starter things

Truffle init scaffolds a starter project for you.
  - contracts/Migrations.sol
    * Migrations contract used by truffle to determine what assets have to be
      migrated

  - migrations/1_initial_migration.js
    * The initial migration SCRIPT which deploys compilation assets for the
      Migrations.sol contract.

  - truffle-config.js
    * centralized location to customize the behavior of your truffle project.
      solidity version, different networks (chains), the structure/layout of your
      build assets.

# Next

  - Lets write a contract that stores a value.
    * How do we know this happened?
    * What is the cycle?
    * What does Truffle suite of tools provide?
