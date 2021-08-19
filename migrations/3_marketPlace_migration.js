const myKittiesContract = artifacts.require("myKittiesContract");
const MarketPlace = artifacts.require("KittyMarketPlace");

module.exports = function(deployer) {
  deployer.deploy(MarketPlace, myKittiesContract.address);
};