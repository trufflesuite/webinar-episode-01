const TruffleBadge = artifacts.require("TruffleBadge");

contract("TruffleBadge", function (accounts) {

  let badge;
  beforeEach(async () => {
    badge = await TruffleBadge.new();
  })

  describe("Creation", () => {

    it("award badge", async () => {
      const meta = "META";
      await badge.awardBadge(accounts[1], meta);
      assert.equal(
        await badge.balanceOf(accounts[1]),
        1
      );
      await badge.awardBadge(accounts[2], meta);
    });

    it.skip("award a badge", async () => {
      return assert.isTrue(true);
    });

  })

});
