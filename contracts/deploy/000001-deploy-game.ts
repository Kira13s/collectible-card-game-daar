import 'dotenv/config'
import { DeployFunction } from 'hardhat-deploy/types'

const { ethers } = require("hardhat");
/*
async function main() {
  const [account] = await ethers.getSigners();
  console.log("Your Ethereum address:", account.address);
}

main();*/
//pour recup son adresse ethereum
const add = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

const deployer: DeployFunction = async hre => {
  if (hre.network.config.chainId !== 31337) return
  const { deployer } = await hre.getNamedAccounts()
  const address = ethers.utils.getAddress(add);
  await hre.deployments.deploy('Main', { from: deployer, log: true, args: [address] })
}

export default deployer
