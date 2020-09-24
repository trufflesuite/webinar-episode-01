const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", function (accounts) {

  // SimpleStorage is deployed once per contract block
  let ssInstance;
  beforeEach( async () => {
    ssInstance = await SimpleStorage.deployed();
  });

  describe("Initial deployment", async () => {
    it("should assert true", async function () {
      await SimpleStorage.deployed();
      assert.isTrue(true);
    });

    it("was deployed and it's intial value is 0", async () => {
      // verify it starts with zero
      const storedData = await ssInstance.getStoredData.call();
      assert.equal(storedData, 0, `Initial state should be zero`);
    });
  });

  describe("Functionality", () => {
    it("should store the value 42", async () => {
      // change the subject
      await ssInstance.setStoredData(42, { from: accounts[0] });

      // verify we changed the subject
      const storedData = await ssInstance.getStoredData.call();
      assert.equal(storedData, 42, `${storedData} was not stored!`);
    });
  });

  describe("Exercises", () => {
    it("should have an owner", async () => {
      const owner = await ssInstance.owner.call();
      assert.equal(owner, accounts[1], "owner should be the deploying address");
    });

    describe("Counter", () => {

      it("user should default to 0", async () => {
        const count = await ssInstance.getCount(accounts[9]);
        assert.equal(count, 0);
      });

      it("tracks user correctly", async () => {
        await ssInstance.setStoredData(123, { from: accounts[3]});
        let count = await ssInstance.getCount(accounts[3]);
        assert.equal(count, 1);

        await ssInstance.setStoredData(122, { from: accounts[3]});
        count = await ssInstance.getCount(accounts[3]);
        assert.equal(count, 2);

        await ssInstance.setStoredData(112, { from: accounts[3]});
        count = await ssInstance.getCount(accounts[3]);
        assert.equal(count, 3);
      });

    });
  });
});
