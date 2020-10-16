const TruffleBadge = artifacts.require("TruffleBadge");

module.exports = function(deployer) {
 
  // const _name = "TruffleBadge";
  // const _symbol = "TRFL";
  
  return deployer
    .then(() => deployer.deploy(TruffleBadge));
};