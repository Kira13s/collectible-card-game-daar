import 'dotenv/config'
import { DeployFunction } from 'hardhat-deploy/types'
const adminAddress = '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E'
//Private Key: 0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd


const deployer: DeployFunction = async hre => {
  if (hre.network.config.chainId !== 31337) return
  const { deployer } = await hre.getNamedAccounts()
  await hre.deployments.deploy('Main', { from: deployer, args: [adminAddress], log: true })
  
}

export default deployer
