import { ethers } from 'ethers'

import { mainAddress, mainABI, setABI, cardABI } from './constants.js'

export async function getCardUser(): Promise<string[]> {
  return new Promise(resolve => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(mainAddress, mainABI, provider)

      provider
        .getSigner()
        .getAddress()
        .then(async address => {
          const transaction = await contract.createCollection(address)
          await transaction.wait()
          resolve(transaction)
        })
    }
  })
}

export async function getSetsOwner(nameSet) {
  return new Promise(async resolve => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(mainAddress, mainABI, provider)

      const addressCollection = await contract.getAddressCollection(nameSet)
      await addressCollection.wait()

      const collection = new ethers.Contract(
        addressCollection,
        setABI,
        provider
      )

      const addressCards = await collection.cardsAddress()
      await addressCards.wait()

      var infos = {}
      addressCards.forEach(async addressCard => {
        const card = new ethers.Contract(addressCard, cardABI, provider)

        const owners = await card.owners()
        await owners.wait()

        const cardId = await card.cardNumber()
        await cardId.wait()
      })

      resolve(infos)
    }
  })
}
