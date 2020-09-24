const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", function (accounts) {

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

  describe("Exercises", () => {
    it("should have an owner", async () => {
      const ssInstance = await SimpleStorage.deployed();
      const owner = await ssInstance.owner.call();
      assert.equal(owner, accounts[1], "owner should be the deploying address");
    });

    describe("Counter", () => {
      it("user should default to 0", async () => {
        const ssInstance = await SimpleStorage.deployed();
        const count = await ssInstance.getCount(accounts[0]);
        assert.equal( count, 0);
      });

    });
  });
});
