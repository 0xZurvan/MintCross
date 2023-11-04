const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
// MintCross contract address (Sepolia): 0x14AD9eC1177Ea8963F9dd4f317884d3cdd984310
// MintCross contract address (Mumbai): 0x4890aFC8c305B6023feCe93b60C77B222733037d

async function main() {
  // local node w/
  // npx hardhat node
  // deploy w/
  // npx hardhat run scripts/deploy.js --network localhost
  // npx hardhat run scripts/deploy.js --network mumbai
  // npx hardhat run scripts/deploy.js --network sepolia
  // Sepolia endpoint: 0x6098e96a28E02f27B1e6BD381f870F1C8Bd169d3
  // Sepolia chainId: 10161
  // Mumbai endpoint: 0xf69186dfBa60DdB133E91E9A4B5673624293d8F8
  // Mumbai chainId: 10112

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Deploy the MintCross contract and pass the deployer address as an argument
  const MintCross = await hre.ethers.getContractFactory("MintCross");
  const MintCrossInstance = await MintCross.connect(deployer).deploy(
    "0x6098e96a28E02f27B1e6BD381f870F1C8Bd169d3", // endpoint
    10161 // chainId
  );
  const MintCrossAddress = await MintCrossInstance.getAddress();
  console.log(`MintCross contract address (Sepolia): ${MintCrossAddress}`);

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