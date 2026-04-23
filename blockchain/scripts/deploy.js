import hre from "hardhat";

async function main() {
  const DigitalWillRegistry = await hre.ethers.getContractFactory("DigitalWillRegistry");
  const registry = await DigitalWillRegistry.deploy();

  await registry.waitForDeployment();

  console.log(`DigitalWillRegistry deployed to ${registry.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
