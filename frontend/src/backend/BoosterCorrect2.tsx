import { ethers } from 'ethers'
import React, { useState } from 'react'
import { useWallet } from '@/App'

export const Booster = () => {
  const [showBuyButton, setShowBuyButton] = useState(false)
  const [buying, setBuying] = useState(false)
  const [error, setError] = useState(null)

  const wallet = useWallet()

  const buyBooster = async (name: string) => {
    if (!wallet) {
      return
    }

    try {
      const provider = wallet.details.provider
      const account = wallet.details.account
      const contract = wallet.contract

      if (account && contract) {
        const balance = await provider.getBalance(account)
        const balanceInEther = ethers.utils.formatEther(balance)
        const cost = (await contract.getCostBooster(name)).toString()

        if (parseFloat(balanceInEther) >= parseFloat(cost)) {
          setBuying(true)
          const transaction = await contract.buyBooster(account, name)
          await transaction.wait()
          setBuying(false)
        } else {
          console.log("Pas assez d'argent pour acheter le booster.")
        }
      }
    } catch (error) {
      console.log("Erreur lors de l'achat du booster : ")
    }
  }

  const handleCardClick = () => {
    setShowBuyButton(true)
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {showBuyButton && (
        <button onClick={() => buyBooster('b1')} disabled={buying}>
          Acheter un booster
        </button>
      )}
    </div>
  )
}
