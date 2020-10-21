const SimpleStorage = artifacts.require("SimpleStorage");
const TruffleAssert = require('truffle-assertions');

contract("SimpleStorage", function (accounts) {

  let ssInstance;
  const [owner, user] = accounts;

  beforeEach( async () => {
    ssInstance = await SimpleStorage.new({from: owner});
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
      await ssInstance.setStoredData(42, { from: user});

      // verify we changed the subject
      const storedData = await ssInstance.getStoredData.call();
      assert.equal(storedData, 42, `${storedData} was not stored!`);
    });

    // it("should emit an event when setting a value", async () => {
    //   const expectedNumber = 420;
    //   const tx = await ssInstance.setStoredData(expectedNumber, { from: user});

    //   TruffleAssert.eventEmitted(tx, 'SSValueStored', (event) => {
    //     return event.setter === user &&
    //            event.value.toString() === '' + expectedNumber;  // value is a BN
    //   });
    // });
  });

  describe("Exercises", () => {
    it("should have an owner", async () => {
      const contractOwner = await ssInstance.owner.call();
      assert.equal(contractOwner, owner, "owner should be the deploying address");
    });

    describe("Counter", () => {

      it("user should default to 0", async () => {
        const count = await ssInstance.getCount(user);
        assert.equal(count, 0);
      });

      it("non owners not allowed", async() => {
        await TruffleAssert.reverts(
          ssInstance.getCount(user, {from: user}),
          "restricted to owner"
        );
      });

      it("tracks user correctly", async () => {
        await ssInstance.setStoredData(123, {from: user});
        let count = await ssInstance.getCount(user);
        assert.equal(count, 1);

        await ssInstance.setStoredData(122, {from: user});
        count = await ssInstance.getCount(user);
        assert.equal(count, 2);

        await ssInstance.setStoredData(112, {from: user});
        count = await ssInstance.getCount(user);
        assert.equal(count, 3);
      });

    });
  });
});
