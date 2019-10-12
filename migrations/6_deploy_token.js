const PizzaPartyPoints = artifacts.require('./PizzaPartyPoints.sol');

module.exports = function (deployer, network, accounts) {
  return deployer.deploy(PizzaPartyPoints)
};
