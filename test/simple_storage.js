const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", function (accounts) {
  describe("Initial deployment", async () => {
    it("should assert true", async function () {
      await SimpleStorage.deployed();
      assert.isTrue(true);
    });

    it("was deployed and its intial value is 12", async () => {
      // get subject
      const ssInstance = await SimpleStorage.deployed();
      // verify it starts with 12
      const storedData = await ssInstance.getStoredData.call();
      assert.equal(storedData, 12, `Initial state should be 12`);
    });
  });
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

    it("should not let someone else change the variable", async () => {
      const [ owner, badBob ] = accounts;
      const ssInstance = await SimpleStorage.new(42, { from: owner });
  
      /*
       *
       * @comment: if you wanted to interact with web3, here is an 
       * example of checking the balance of an account and outputting
       * the result to the test console       
       *
       * const balance = await web3.eth.getBalance(owner);
       * console.log(balance);
       *
       */
  
      try {
        await ssInstance.setStoredData(22, { from: badBob });
      } catch(err) { }
  
      const storedData = await ssInstance.getStoredData.call();
      assert.equal(storedData, 42, "storedData was not changed!"); 
    });
  });
});
