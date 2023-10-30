import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
//import * as main from '@/lib/main'

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

/*const useWallet = () => {
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
}*/

const useNft = () => {
  const [nftData, setNftData] = useState(null)
  useEffect(() => {
    // Recup les infos du NFT vers l'API en fonction de l'ID
    fetch('/nft/1') // remplacer '1' par l'ID du NFT à recuperer
      .then(response => response.json())
      .then(data => setNftData(data))
      .catch(error => console.error(error))
  }, [])
}

//utiliser le nft et le wallet
export const App = () => {
  //const wallet = useWallet();
  const nft = useNft()
  return <div className={styles.body}></div>
}
