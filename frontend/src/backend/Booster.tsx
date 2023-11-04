import { ethers } from 'ethers'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as ethereum from '../lib/ethereum'
import * as main from '../lib/main'

//import { useWallet } from '@/App'


export async function buyBooster(name: string): Promise<boolean> {
  return new Promise(async resolve => {
    try {
      const wallet = useWallet()
      if (wallet) {
        const provider = wallet.details.provider
        const account = wallet.details.account
        const contract = wallet.contract
        if (account && contract) {
          provider
            .getBalance(account)
            .then(async balance => {
              const balanceInEther = ethers.utils.formatEther(balance)
              const cost = await contract.getCostBooster(name)
              await cost.wait()

              if (balanceInEther >= cost) {
                const transaction = await contract.buyBooster(account, name)
                await transaction.wait()
                resolve(true)
              }
            })
            .catch(error => {
              console.error('Erreur lors de la récupération du solde :', error)
            })
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'achat du booster :", error)
    }
  })
}

type Canceler = () => void
const useAffect = (
  asyncEffect: () => Promise<Canceler | void>,
  dependencies: any[] = []
) => {
  const cancelerRef = useRef<Canceler | void>()
  useEffect(() => {
    asyncEffect()
      .then(canceler => (cancelerRef.current = canceler))
      .catch(error => console.warn('Uncatched error', error))
    return () => {
      if (cancelerRef.current) {
        cancelerRef.current()
        cancelerRef.current = undefined
      }
    }
  }, dependencies)
}

const useWallet = () => {
  const [details, setDetails] = useState<ethereum.Details>()
  const [contract, setContract] = useState<main.Main>()
  useAffect(async () => {
    const details_ = await ethereum.connect('metamask')
    if (!details_) return
    setDetails(details_)
    const contract_ = await main.init(details_)
    if (!contract_) return
    setContract(contract_)
  }, [])
  return useMemo(() => {
    if (!details || !contract) return
    return { details, contract }
  }, [details, contract])
}
