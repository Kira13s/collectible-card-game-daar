import { ethers } from 'ethers'
import React, { useState, useEffect } from 'react'

import { setABI, cardABI } from './constants.js'
import { useWallet } from '@/App.js'
import type { Collection } from '$/src/Collection'

export const GetInfo = async () => {
  const [items, setItems] = useState([])

  function getCardUser(): Promise<string[]> {
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

  const items = []
  const res = await getCardUser()
  for (let i = 0; i < 5; res.length) {
    let currentCardIndex = 0
    const cardsPerPage = 10
    let cardData: any[] = []

    function loadCardData() {
      fetch(res[i])
        .then(response => response.json())
        .then(data => {
          // Assurez-vous que le fichier JSON contient un tableau d'objets représentant les cartes Pokémon
          if (Array.isArray(data)) {
            cardData = data
            displayItems()
          } else {
            console.error(
              "Le fichier JSON ne contient pas de tableau d'objets."
            )
          }
        })
        .catch(error => {
          console.error('Erreur de chargement des données :', error)
        })
    }

    function displayItems() {
      const cardContainer = document.createElement('div') // Utilisation de <a> pour le lien
      cardContainer.className = 'img-collection'

      const Img = document.createElement('img')
      Img.className = 'logoP'
      Img.src = cardData[i].images.small
      items.push(
        <div key={i} className="img-collection">
          <img
            className="logoP"
            src={cardData[i].images.small}
            alt={`Image ${i}`}
          />
        </div>
      )
    }
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
  return <div>{items}</div>
}
