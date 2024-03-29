
// const { network } = require("hardhat")

// const DECIMALS = 8
// const INITIAL_ANSWER = 200000000000 // 2000
// module.exports = async ({ getNamedAccounts, deployments }) => {
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = network.config.chainId
//     // If we are on a local development network, we need to deploy mocks!
//     if (chainId == 31337) {
//         log("Local network detected! Deploying mocks...")
//         await deploy("MockV3Aggregator", {
//             contract: "MockV3Aggregator",
//             from: deployer,
//             log: true,
//             args: [DECIMALS, INITIAL_ANSWER],
//         })
//         log("Mocks Deployed!")
//         log("------------------------------------------------")
//         log(
//             "You are deploying to a local network, you'll need a local network running to interact"
//         )
//         log(
//             "Please run `npx hardhat console` to interact with the deployed smart contracts!"
//         )
//         log("------------------------------------------------")
//     }
// }
// module.exports.tags = ["all", "mocks"]



// imports
//main function
// then call main function
// hre is Hradhat Runtime Envinorment

// function mainFun(hre){
//     console.log("Hi!!!!!")
//     hre.getNamedAccoutns
//     hre.deployments
// };

// module.exports.default = mainFun

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
//     // hre.getNamedAccoutns
//     // hre.deployments
// }

const { getNamedAccounts, deployments, network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)


}

module.exports.tags = ["all", "fundme"]