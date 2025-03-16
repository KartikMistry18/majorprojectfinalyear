const hre = require("hardhat");
//0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
//0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6.
async function main() {
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy(); // Deploy contract

  await crowdFunding.deployed(); // Use `.deployed()` instead of `.waitForDeployment()`

  console.log(`crowdFunding deployed to ${crowdFunding.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
