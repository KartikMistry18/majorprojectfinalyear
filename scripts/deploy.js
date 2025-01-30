const hre = require("hardhat");
// 0x0165878A594ca255338adfa4d48449f69242Eb8F
async function main() {
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy(); // Deploy contract

  await crowdFunding.waitForDeployment(); // Wait for deployment

  console.log(`crowdFunding deployed to ${await crowdFunding.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
