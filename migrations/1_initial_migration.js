
var LeagueFactory = artifacts.require("./LeagueFactory.sol");
var League = artifacts.require("./League.sol");

module.exports = function(deployer) {
  console.log('anyting')

  deployer.deploy(LeagueFactory).send({ gas: '1000000', from: accounts[0] });
  //deployer.deploy(League)
};
