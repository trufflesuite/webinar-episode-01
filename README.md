# Explore the full lifecycle of developing a Dapp

This document is the accompanying notes for [Episode
1](https://www.crowdcast.io/e/truffle-webinar-series--) of our webinar series.

![Img 1](https://trufflesuite.com/img/events/webinar-livestream2.jpg)


## Resources

  - [Transcript](./steps.md) of the live code session.
  - Code challenge
    - Implement the following new behavior in the contract following TDD.
      - The contract should have the concept of an owner. Note that truffle uses the first account to sign deployments.
      - Add the ability to keep track of each time an address calls `setStoredData`. This will need:
        - a
          [mapping](https://solidity.readthedocs.io/en/v0.7.1/types.html#mapping-types)
          `mapping[address => uint]` and update it every time someone calls
          `setStoredData`
        - a function `getCount(address _address)` that returns the count associated with `_address`
        - a [modifier](https://solidity.readthedocs.io/en/v0.7.1/structure-of-a-contract.html#function-modifiers) to guard that only the owner can call `getCount` which should [revert](https://solidity.readthedocs.io/en/v0.7.1/control-structures.html#revert) when invoked with the wrong caller.
        - This [Truffle Assertion plugin](https://github.com/rkalis/truffle-assertions) which helps test for revert.
