const IpContract = artifacts.require("IpContract");

module.exports = function(deployer) {
	deployer.deploy(IpContract);
}