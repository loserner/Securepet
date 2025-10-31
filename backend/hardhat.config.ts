import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@fhevm/hardhat-plugin";
import "dotenv/config";

const sepoliaAccounts = process.env.MNEMONIC
  ? { mnemonic: process.env.MNEMONIC }
  : process.env.PRIVATE_KEY
  ? [process.env.PRIVATE_KEY]
  : undefined;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800
      },
      evmVersion: "cancun"
    }
  },
  paths: {
    sources: "contracts",
    tests: "test",
    cache: "cache",
    artifacts: "artifacts"
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      chainId: 11155111,
      accounts: sepoliaAccounts
    }
  }
};

export default config;


