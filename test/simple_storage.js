const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", function (accounts) {
  describe("Initial deployment", async () => {
    it("should assert true", async function () {
      await SimpleStorage.deployed();
      assert.isTrue(true);
    });
  });
});
