const myKittiesContract = artifacts.require("myKittiesContract");

module.exports = function(deployer) {
  deployer.deploy(myKittiesContract);
};