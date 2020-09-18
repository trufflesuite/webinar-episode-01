# Project initialization

  - [ ] First [install Truffle. See documentation here](https://www.trufflesuite.com/docs/truffle/getting-started/installation).
  - [ ] Create a new folder and invoke the `truffle init` command

```sh
$ mkdir tut && cd $_
$ truffle init
```

<details> <summary>See output</summary>

```sh
$ truffle init

Starting init...
================

> Copying project files to /home/amal/work/webinars/tut

Init successful, sweet!
```

</details>

<hr />

Truffle built out the following a few files that we don't have to worry about
in this episode. We'll get to them in subsequent episodes.

File                                                          | description
--------------------------------------------------------------| ----------------------------
[Migrations.sol](./contracts/Migrations.sol)                  | a migration contract
[1_initial_migration.js](./migrations/1_initial_migration.js) | a migration script
[truffle-config.js](./truffle-config.js)                      | Truffle's configuration file


Lets test that the system is ok. truffle test!

> `truffle test` runs all tests located in the test subdirectory of the project
> root.

```sh
$ truffle test
```

<details> <summary>See output</summary>

```sh
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations
```

</details>

### Status

We have a Truffle project that we can add features to.
  - [x] Project created

# Introduce our features

We want to write a Smart Contract that stores a value that can be retrieve. To
do this we need to have the following.
  - [ ] a smart contract, `SimpleStorage`
  - [ ] some way to define the behavior of `SimpleStorage`
  - [ ] the ability to verify `SimpleStorage` behaves the way we defined

We will use aspects of Behavior driven development(BDD), and Test driven
development (TDD) methodologies to work out way through this tutorial. We will
define new behavior/features by introducing a Truffle test and use it as a
starting point to implement the feature.

This approach will give us an opportunity to examine out system in small
testable pieces to build up our knowledge and intuition of Truffle, Solidity
and the ecosystem.


## Behaviors

Let's create the SimpleStorage test-file, invoke truffle test, and examine the output.


> `truffle create test <ContractName>` is a quick way to scaffold a test!  This
> is where we define the behavior of a contract

<details>
<summary>See output</summary>

``` sh
$ truffle create test SimpleStorage
$ truffle test

Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Artifacts written to /tmp/test--15904-aWUmTcuhKTB5
> Compiled successfully using:
- solc: 0.5.16+commit.9c3226ce.Emscripten.clang

  Error: Could not find artifacts for SimpleStorage from any sources
  at Resolver.require (/home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/build/webpack:/packages/resolver/dist/lib/resolver.js:35:1)
  at TestResolver.require (/home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/TestResolver.js:24:1)
  at Object.require (/home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/build/webpack:/packages/core/lib/test.js:278:1)
  at Object.<anonymous> (/home/amal/work/webinars/tut/test/simple_storage.js:1:33)
  at Module._compile (internal/modules/cjs/loader.js:778:30)
  at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
  at Module.load (internal/modules/cjs/loader.js:653:32)
  at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
  at Function.Module._load (internal/modules/cjs/loader.js:585:3)
  at Module.require (internal/modules/cjs/loader.js:692:17)
at require (internal/modules/cjs/helpers.js:25:18)
  at /home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/node_modules/mocha/lib/mocha.js:390:36
  at Array.forEach (<anonymous>)
  at Mocha.loadFiles (/home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/node_modules/mocha/lib/mocha.js:387:14)
  at Mocha.run (/home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/node_modules/mocha/lib/mocha.js:961:10)
  at resolve (/home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/build/webpack:/packages/core/lib/test.js:159:1)
  at new Promise (<anonymous>)
  at Object.run (/home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/build/webpack:/packages/core/lib/test.js:158:1)
  at process._tickCallback (internal/process/next_tick.js:68:7)
Truffle v5.1.43 (core: 5.1.43)
  Node v10.20.1
```
</details>


The prominent error, below, is a clue to what's going on.

``` sh
Error: Could not find artifacts for SimpleStorage from any sources
```

Truffle test mocks! It compiles and deploys the contracts we write to a local
test blockchain every time we run `truffle test`.  Our only test is trying to
get a deployed `SimpleStorage` and fails because we have not yet introduced
this contract to our project.

> [Be sure to study the test code before proceeding](./test/simple_storage.js).


## SimpleStorage Contract

Now that we've defined the behavior of the SimpleStorage contract we want to
write.  Let's create it and run `truffle test`

> `truffle create contract <ContractName>` is a quick way to scaffold a project!

``` sh
$ truffle create contract SimpleStorage
$ truffle test
```

<details> <summary>Examine test output</summary>

``` sh
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /tmp/test--16564-yHf6bkBqCImA
> Compiled successfully using:
- solc: 0.5.16+commit.9c3226ce.Emscripten.clang


Contract: SimpleStorage
Error: SimpleStorage has not been deployed to detected network (network/artifact mismatch)
Error: SimpleStorage has not been deployed to detected network (network/artifact mismatch)
1) should assert true
> No events were emitted


0 passing (42ms)
  1 failing

  1) Contract: SimpleStorage
  should assert true:
  Uncaught Error: the string "abort(Error: SimpleStorage has not been deployed to detected network (network/artifact mismatch)). Build with -s ASSERTIONS=1 for more info." was thrown, throw an Error :)
  at process.emit (/home/amal/.nvm/versions/node/v10.20.1/lib/node_modules/truffle/build/webpack:/node_modules/source-map-support/source-map-support.js:495:1)
at process._fatalException (internal/bootstrap/node.js:497:27)
```

</details>

``` sh
Error: SimpleStorage has not been deployed to detected network (network/artifact mismatch)
```

This error is informative. It tells us that `SimpleStorage` has not been
deployed to a network. Here's what `truffle test` does at a high level.
  - starts up a local test chain
  - compiles all contracts it knows about
  - deploys those contracts
  - calls all the tests in the system and displays the results

This is an incredibly useful feature Truffle does for us.  As Smart contract
developers, for the most part, to implement our contract logic and not have to
wrestle with complicated testchain business.

Recall that Truffle scaffolded a migration script `1_initial_migration`. Review it
to see how it deploys a Contract.


## Migration SimpleStorage

When truffle runs, it will execute all the deployments scripts in order lexical
order. In order to get our SimpleStorage contract deployed (migrated) we have
to create a deployment script for it.

Create the the SimpleStorage deployment. Call it
`migrations/2_deploy_simple_storage.js` and then execute another test

``` Solidity
// migrations/2_deploy_simple_storage.js
const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
}
```

Execute Truffle test

``` sh
$ truffle test
```

<details> <summary>Examine test output</summary>

``` sh
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /tmp/test--17726-UpvQCi3AszsJ
> Compiled successfully using:
- solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Contract: SimpleStorage
✓ should assert true


1 passing (34ms)

```
</details>

Contratulations! If you see a similar output then you have:
  - [x] a smart contract, `SimpleStorage`
  - [x] a way to define the behavior of `SimpleStorage`
  - [x] a way to validate its behavior is correct

# Behavior: Our business logic.

The SimpleStorage contract should have:
  - [ ] a state, `storedData`. This is the location to store an integer value
  - [ ] its `storedData` value at deployment be zero
  - [ ] a function `getStoredData`, to retrieve the current `storedData` value.
  - [ ] a function `setStoredData`, to set the `storedData` value.


## definition: storedData initial deployment value

Add the following code to the test file and execute truffle test.

``` JavaScript
contract("SimpleStorage", (/* accounts */) => {
  describe("Initial deployment", async () => {
    it("should assert true", async function () {
      await SimpleStorage.deployed();
      assert.isTrue(true);
    });

    it("was deployed and it's intial value is 0", async () => {
      // get subject
      const ssInstance = await SimpleStorage.deployed();
      // verify it starts with zero
      const storedData = await ssInstance.getStoredData.call();
      assert.equal(storedData, 0, `Initial state should be zero`);
    });
  });
});

```

## test: watch it fail

Since we just defined the behavior we expect the test to fail. Lets see how the system reports this expected failure.

> This is a great way to learn about new systems. I expect the test to fail and
> want to learn exactly how the system reports the error. This will help build
> my intuition abou the system

``` sh
$ truffle test

```
<details> <summary>See test result</summary>

``` sh
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /tmp/test--40553-kTukJ514YAII
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



  Contract: SimpleStorage
    Initial deployment
      ✓ should assert true
      1) was deployed and it's intial value is 0
    > No events were emitted


  1 passing (50ms)
  1 failing

  1) Contract: SimpleStorage
       Initial deployment
         was deployed and it's intial value is 0:
     TypeError: Cannot read property 'call' of undefined
      at Context.it (test/simple_storage.js:14:57)
      at process._tickCallback (internal/process/next_tick.js:68:7)

```
</details>

The following lines in the output indicates something is undefined. The error
includes a file location coordinate, filename + line and column location.  Take
a look at the file and try to deduce what's happening.

``` sh
     TypeError: Cannot read property 'call' of undefined
      at Context.it (test/simple_storage.js:14:57)
```

> This type of error will be a common occurence and it's good to start building
> your intuition about them


## implement getStoredData

update SimpleStorage.sol to
  - declare a public uint256 named storedData
  - add a public view named getStoredData that returns the contract's state storedData

``` Solidity
contract SimpleStorage {
  uint256 public storedData;

  function getStoredData() public view returns (uint256) {
    return storedData;
  }

}
```

## test: will it pass?

``` sh
$ truffle test
```

<details> <summary>See output</summary>

``` sh
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /tmp/test--41672-tvxa6sdLx1V6
> Compiled successfully using:
- solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Contract: SimpleStorage
Initial deployment
✓ should assert true
✓ was deployed and it's intial value is 0


2 passing (63ms)
```
</details>

Woo! SimpleStorage now has:

  - [x] a state, `storedData`. This is the location to store an integer value
  - [x] its `storedData` value at deployment be zero
  - [x] a function `getStoredData`, to retrieve the current `storedData` value.
  - [ ] a function `setStoredData`, to set the `storedData` value.

> Something to ponder for later: we didn't initialze the state, yet its initial
> value is zero. Why do you think that is?


## define setStoredData behavior

There's only one bit of feature missing. Lets implement!
  - [ ] a function `setStoredData`, to set the `storedData` value.

Add the following describe block to our the test and run truffle test.

``` javascript
describe("Functionality", () => {
 it("should store the value 42", async () => {
   // get subject
   const ssInstance = await SimpleStorage.deployed();

   // change the subject
   await ssInstance.setStoredData(42, { from: accounts[0] });

   // verify we changed the subject
   const storedData = await ssInstance.getStoredData.call();
   assert.equal(storedData, 42, `${storedData} was not stored!`);
   });
 });

```

``` sh
$ truffle test
```

<details> <summary>see output</summary>

``` sh
$ truffle test

Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /tmp/test--42579-z0xosuySymKs
> Compiled successfully using:
- solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Contract: SimpleStorage
Initial deployment
✓ should assert true
✓ was deployed and it's intial value is 0
Functionality
1) should store the value 42
> No events were emitted


2 passing (82ms)
  1 failing

  1) Contract: SimpleStorage
  Functionality
  should store the value 42:
  ReferenceError: accounts is not defined
  at Context.it (test/simple_storage.js:25:50)
at process._tickCallback (internal/process/next_tick.js:68:7)
```

</details>


``` sh
  ReferenceError: accounts is not defined
```

This error indicates that we haven't included accounts in our test.

> When truffle runs its tests it creates a local testnet and creates 10 funded
accounts that smart contract developers can use for testing. This is part of
the identity concept mentioned in the earlier part of the webinar.


Let's make sure we have accounts in our tests.  Uncomment `accounts` so test
entry point reads as:

``` javascript
  contract("SimpleStorage", function (accounts) {
```

Run truffle test

```sh
$ truffle test
```

<details> <summary>see output</summary>

```sh
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /tmp/test--43198-xp1rxfykLBu7
> Compiled successfully using:
- solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Contract: SimpleStorage
Initial deployment
✓ should assert true
✓ was deployed and it's intial value is 0
Functionality
1) should store the value 42
> No events were emitted


2 passing (81ms)
  1 failing

  1) Contract: SimpleStorage
  Functionality
  should store the value 42:
  TypeError: ssInstance.setStoredData is not a function
  at Context.it (test/simple_storage.js:25:24)
at process._tickCallback (internal/process/next_tick.js:68:7)
```

</details>

## implement setStoredData

The following line in the output indicates that `setStoredData` is not a
function. We should fix that.

```
  TypeError: ssInstance.setStoredData is not a function
```

Add the following function to the SimpleStorage contract

``` solidity
function setStoredData(uint256 x) public {
  storedData = x;
}
```

Lets run truffle test once again

``` sh
$ truffle test
```

<details><summary>see results</summary>

``` sh
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /tmp/test--44360-9r4fMMWnmb6y
> Compiled successfully using:
- solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Contract: SimpleStorage
Initial deployment
✓ should assert true
✓ was deployed and it's intial value is 0
  Functionality
✓ should store the value 42 (55ms)


3 passing (125ms)
```
</details>

Congratulations! You did it! I hope this exercise was helpful and recommend you
continue exploring.
