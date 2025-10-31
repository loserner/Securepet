import { promises as fs } from "fs";
import path from "path";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const PetGame = await ethers.getContractFactory("PetGame");
  const contract = await PetGame.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("PetGame deployed to:", address);

  // Prepare ABI and address export for frontend and backend
  const artifactsPath = path.join(
    process.cwd(),
    "artifacts/contracts/PetGame.sol/PetGame.json"
  );
  const artifactJson = JSON.parse(await fs.readFile(artifactsPath, "utf-8"));
  const abi = artifactJson.abi;

  const exportObject = { address, abi };

  const frontendTarget = path.join(
    process.cwd(),
    "..",
    "frontend",
    "src",
    "contracts",
    "PetGame.json"
  );
  const backendTarget = path.join(
    process.cwd(),
    "src",
    "contracts",
    "PetGame.json"
  );

  await fs.mkdir(path.dirname(frontendTarget), { recursive: true });
  await fs.mkdir(path.dirname(backendTarget), { recursive: true });
  await fs.writeFile(frontendTarget, JSON.stringify(exportObject, null, 2));
  await fs.writeFile(backendTarget, JSON.stringify(exportObject, null, 2));
  console.log("ABI and address exported to frontend and backend.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


