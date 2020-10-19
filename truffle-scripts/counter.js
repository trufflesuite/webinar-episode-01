const SimpleStorage = artifacts.require("SimpleStorage");

const main = async (callback) =>  {
  // deploy a new contract
  const ss = await SimpleStorage.new();

  let counter = 42;

  for (let i=0; i<10; i++) {
    await ss.setStoredData(counter+i);
    const data = await ss.getStoredData();
    console.log(`Data: ${data}`);
  }

  callback();
}

// Two terminals are neededed
//   - term 1: start ganache-cli
//     `$ ganache-cli`
//   - term 2: run truffle exec command with "local" network specified in truffle-config.js
//     `$ truffle exec truffle-scripts/counter.js --network local`

module.exports = main
