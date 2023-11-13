const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  // local node w/
  // npx hardhat node
  // deploy w/
  // npx hardhat run scripts/deploy.js --network localhost
  // npx hardhat run scripts/deploy.js --network mumbai
  // npx hardhat run scripts/deploy.js --network sepolia
  // Sepolia endpoint: 0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1
  // Sepolia chainId: 10161
  // Mumbai endpoint: 0xf69186dfBa60DdB133E91E9A4B5673624293d8F8
  // Mumbai chainId: 10109

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Deploy the MintCross contract and pass the deployer address as an argument
  const MintCross = await hre.ethers.getContractFactory("MintCross");
  const MintCrossInstance = await MintCross.connect(deployer).deploy(
    "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8", // Local endpoint
    10161 // RemoteChainId
  );
  const MintCrossAddress = await MintCrossInstance.getAddress();
  console.log(`MintCross contract address (Mumbai): ${MintCrossAddress}`);

  const MintCrossAbi = JSON.stringify({
    address: MintCrossAddress,
    abi: MintCrossInstance.interface.format("json"),
  });

  const abiDirectory = path.join(__dirname, "../../client/src/abis");

  // Create the directory if it does not exist
  if (!fs.existsSync(abiDirectory)) {
    fs.mkdirSync(abiDirectory, { recursive: true });
  }

  const abiFilePath = path.join(abiDirectory, "MintCrossABI.json");
  fs.writeFileSync(abiFilePath, MintCrossAbi);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});