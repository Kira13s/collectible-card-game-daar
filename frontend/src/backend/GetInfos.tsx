import { ethers } from 'ethers'
import { setABI, cardABI } from './constants.js'
import { useWallet } from '@/App.js'
import type { Collection } from '$/src/Collection'
import { ReactElement, JSXElementConstructor, ReactFragment } from 'react'

export const GetInfo = () => {
  const getCardUser = async () => {
    return new Promise(async resolve => {
      const wallet = useWallet()
      if (wallet) {
        const account = wallet.details.account
        const contract = wallet.contract

        if (contract && account) {
          const transaction = await contract.getCardsUserUri(account)
          resolve(transaction)
        }
      }
    })
  }

  function getSetsOwner(nameSet: string) {
    return new Promise(async resolve => {
      const wallet = useWallet()
      if (wallet) {
        const provider = wallet.details.provider
        const contract = wallet.contract
        const signer = wallet.details.signer

        if (contract) {
          const addressCollection = await contract.getAddressCollection(nameSet)
          const collection = new ethers.Contract(
            addressCollection,
            setABI,
            provider
          )

          const deployed = await collection.deployed()
          if (!deployed) return null
          const collection_ = signer
            ? collection.connect(signer)
            : (collection as any as Collection)

          const addressCards = await collection_.cardsAddress()
          await addressCards.wait()

          var infos = {}
          addressCards.forEach(async (addressCard: string) => {
            const card = new ethers.Contract(addressCard, cardABI, provider)

            const owners = await card.owners()
            await owners.wait()

            const cardId = await card.cardNumber()
            await cardId.wait()
          })

          resolve(infos)
        }
      }
    })
  }
  const items:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | null
    | undefined = []

  const res = getCardUser()
  for (let i = 0; i < 10; i++) {
    //itérer sur res pour afficher toutes les cartes dans items
  }
  return <div> {items} </div>
}
