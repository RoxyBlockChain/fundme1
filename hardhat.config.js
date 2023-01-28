require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
// require("@nomiclabs/hardhat-etherscan");
// require("hardhat-gas-reporter");
// require("hardhat-coverage");
require("hardhat-deploy");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const ETHERSCAN_API_KEY= process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      //Accounts Thanks hardhat
      chainId: 31337,
    }
  },
  //solidity: "0.8.9",
  solidity: {
    compilers: [{version: "0.8.8"},{version: "0.6.6"}],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH",
  },
  namedAccounts: {
    deployer:{
      default: 0,
    },
    user:{
      default: 1, 
    },
  },
};
