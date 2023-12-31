import { ethers } from 'ethers'
import React, { useState } from 'react'
import styles from './styles.module.css'
import { useWallet } from '@/App'

export const Booster = () => {
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
        console.log('erreur à cause de cost !')
        if (parseFloat(balanceInEther) >= parseFloat(cost)) {
          setBuying(true)
          const transaction = await contract.buyBooster(account, name)
          await transaction.wait()
          setBuying(false)
        } else {
          console.log("pas d'argent! ")
        }
      }
    } catch (error) {
      console.log('arror achat')
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <button
        className={styles.bouton}
        onClick={() => buyBooster('b1')}
        disabled={buying}
      >
        Acheter un booster
      </button>
    </div>
  )
}

export default Booster
