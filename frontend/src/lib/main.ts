import { ethers } from 'ethers'
import * as ethereum from './ethereum'

import { contracts } from '@/contracts.json' //ces 3 imports ne passent pas pour l'instant
import type { Main } from '$/Main'
export type { Main } from '$/Main'

export const correctChain = () => {
  return 31337
}

export const init = async (details: ethereum.Details) => {
  const { provider, signer } = details
  const network = await provider.getNetwork()
  if (correctChain() !== network.chainId) {
    console.error('Please switch to HardHat')
    return null
  }
  const { address, abi } = contracts.Main
  const contract = new ethers.Contract(address, abi, provider)
  const deployed = await contract.deployed()
  if (!deployed) return null
  const contract_ = signer ? contract.connect(signer) : contract
  return contract_ as any as Main
}

export const myShip = () => contracts.Main.address

/*import Web3 from 'web3'

// Déclaration pour contourner l'erreur de type
declare global {
  interface Window {
    ethereum?: any // 'any' pour éviter les vérifications de type
  }
}

const web3 = new Web3(window.ethereum)

// se connecter + recuperation des nft
if (window.ethereum) {
  window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts: string[]) => {
      const userAccount = accounts[0]

      // Configuration du contrat ERC-721
      const contractAddress = '' //l'adresse du contrat ERC-721
      const erc721Abi = [
        // l'ABI du contrat ERC-721 qu on veut cibler
        //pad compris !
      ]
      const contract = new web3.eth.Contract(erc721Abi, contractAddress)

      // Récupérer les NFT du user
      try {
        const tokenIds = await contract.methods
          .tokenOfOwnerByIndex(userAccount, 0)
          .call()
        console.log(`L'utilisateur possède le NFT avec l'ID : ${tokenIds}`)
      } catch (error) {
        console.error('Erreur lors de la récupération des NFT : ', error)
      }
    })
    .catch((error: Error) => {
      console.error(error)
    })
}*/
