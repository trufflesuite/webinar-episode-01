# Explore the full lifecycle of developing a Dapp

Kevin Bluer and Amal Sudama [gave an
overview](https://www.crowdcast.io/e/truffle-webinar-series--) of Ethereum eco
system, the Truffle Suite of tools, and walk you through the workflow to
scaffold and develop a dapp with Truffle

![Img 1](https://trufflesuite.com/img/events/webinar-livestream2.jpg)

The [live code tranascript](./steps.md) walks through the material covered in
the video. If you'd like a challenge add a new behavior to the contract.

  * The contract should have the concept of an owner, which for our purposes is the account that signed the deployment.
  * Add a
    [mapping](https://solidity.readthedocs.io/en/v0.7.1/types.html#mapping-types)
    of address -> count to keep track of how many times an address invoked the
    setStoredData function. The mapping should be
    [private](https://solidity.readthedocs.io/en/v0.7.1/cheatsheet.html#function-visibility-specifiers)
  * Add a function that returns how many times an account called setStoredData, and [only allow the owner](https://solidity.readthedocs.io/en/v0.7.1/structure-of-a-contract.html#function-modifiers) to invoke it.

## Resources
  * [Video archive](https://www.crowdcast.io/e/truffle-webinar-series--). Note you will have to register with crowdcast to see the video
  * [Live code transcript](./steps.md)
