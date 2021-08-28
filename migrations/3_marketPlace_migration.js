const migrateKittiesContract = artifacts.require("myKittiesContract");
const MarketPlace = artifacts.require("KittyMarketPlace");

module.exports = function(deployer) {
  deployer.deploy(MarketPlace, migrateKittiesContract.address);
};