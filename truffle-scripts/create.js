const TruffleBadge = artifacts.require("TruffleBadge");

const main = async (cb) => {
  acc1 = '0xb72Ea762B8b4D519449ae1e995F091ba2508bB94';
  acc2 = '0xb72Ea762B8b4D519449ae1e995F091ba2508bB95';
  acc3 = '0xb72Ea762B8b4D519449ae1e995F091ba2508bB96';

  const meta = "META";
  badge = TruffleBadge.deployed();
  await badge.awardBadge(acc1, meta);
  //await badge.awardBadge(acc2, meta);
  //await badge.awardBadge(acc3, meta);
  console.log('hi');
  cb();
}

module.exports = main
