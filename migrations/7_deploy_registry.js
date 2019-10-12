const PizzaPartyPoints = artifacts.require('./PizzaPartyPoints.sol');
const Registry = artifacts.require('./Registry.sol');
const Parameterizer = artifacts.require('./Parameterizer.sol');
const PLCR = artifacts.require('plcr-revival/PLCRVoting.sol');

const DLL = artifacts.require('dll/DLL.sol');
const AttributeStore = artifacts.require('attrstore/AttributeStore.sol');

const PERCENT = 1;
const DEPI = 10 ** 15;
const MIN = 60;
const HOUR = MIN * 60
const DAY = HOUR * 24;

module.exports = function (deployer, network, accounts) {
  deployer.link(DLL, PLCR);
  deployer.link(AttributeStore, PLCR);

	let registry, parameterizer, plcr;
  deployer.deploy(Registry)
		.then((contract) => {
			registry = contract;
			return deployer.deploy(Parameterizer);
		})
		.then((contract) => {
			parameterizer = contract;
			return deployer.deploy(PLCR);
		})
    .then((contract) => {
      plcr = contract;

			console.log("  Initializing PLCR contract")
      return plcr.init(PizzaPartyPoints.address);
    })
    .then(() => {
			console.log("  Initializing parameterizer contract")
      return parameterizer.init(
        PizzaPartyPoints.address,
        plcr.address,
        [
          // minDeposit
          500 * DEPI,
          // pMinDeposit
          15000000 * DEPI,
          // applyStageLen (2 days)
          12 * HOUR,
          // pApplyStageLen
          15000000 * DEPI,
          // commitStageLen
          12 * HOUR,
          // pCommitStageLen
          15000000 * DEPI,
          // revealStageLen
          6 * HOUR,
          // pRevealStageLen
          15000000 * DEPI,
          // dispensationPct
          75 * PERCENT,
          // pDispensationPct
          15000000 * DEPI,
          // voteQuorum
          50 * PERCENT,
          // pVoteQuorum
          15000000 * DEPI,
          // exitTimeDelay
          12 * HOUR,
          // exitPeriodLen
          6 * HOUR,
        ],
      );
    })
    .then(() => {
      console.log(`  Initializing registry contract`);
      console.log(`    DEPI Address:  ${PizzaPartyPoints.address}`)
      console.log(`    PLCR Address:  ${plcr.address}`)
      console.log(`    Param Address: ${parameterizer.address}`)
      return registry.init(
        PizzaPartyPoints.address,
        plcr.address,
        parameterizer.address,
        "Pizza Party",
      );
    }).then(() => {
      console.log(`  TCR has been deployed to ${registry.address}`);
    });
};
