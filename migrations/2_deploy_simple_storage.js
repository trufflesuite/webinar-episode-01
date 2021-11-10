const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  /* invoke SimpleStorage's constructor, and pass 12 as its first argument */
  deployer.deploy(SimpleStorage, 12);
}
