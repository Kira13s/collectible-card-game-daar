/*import * as fs from 'fs';
import * as readline from 'readline';*/

import { dataPath } from './constants.js'
import { useWallet } from '@/App'

export async function loadCollection() {
  const wallet = useWallet()
  if (wallet != undefined) {
    const mainContract = wallet?.contract

    const sets = dataPath + 'sets.json'
    fetch(sets)
      .then(response => response.json())
      .then(async data => {
        if (data.length > 0) {
          for (const obj of data) {
            const name = obj.name
            const cardCount = obj.total
            await mainContract.createCollection(name, cardCount)

            fetch(dataPath + name + 'cards.json')
              .then(res => res.json())
              .then(async setcard => {
                if (setcard.length > 0) {
                  for (const card of setcard) {
                    const idCard = card.id
                    await mainContract.AddCardToCollection(
                      name,
                      idCard,
                      '${data}/${name}/${idCard}.json'
                    )
                  }
                }
              })

            /*const fileStream = fs.createReadStream(data + name + 'CardsId.txt');
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            rl.on('line', (line: string) => {
                fetch('${data}/${name}/${line}.json')
                .then(response => response.json())
                .then(async card => {
                  await mainContract.AddCardToCollection(name, card.id, '${data}/${name}/${line}.json');

                })
            });

            rl.on('close', () => { });*/
          }
        } else {
          console.log('Aucun objet JSON trouvÃ©.')
        }
      })
  }
}

export async function loadBooster() {
  const wallet = useWallet()
  if (wallet != undefined) {
    const mainContract = wallet?.contract

    const sets = dataPath + 'sets.json'
    const setCardId: Map<string, [string]> = new Map()

    fetch(sets)
      .then(response => response.json())
      .then(async data => {
        if (data.length > 0) {
          for (const obj of data) {
            const name = obj.name
            const cardCount = obj.total
            await mainContract.createCollection(name, cardCount)

            fetch(dataPath + name + 'cards.json')
              .then(res => res.json())
              .then(async setcard => {
                if (setcard.length > 0) {
                  for (const card of setcard) {
                    const idCard = card.id
                    const ids = setCardId.get(name)
                    if (ids) {
                      ids.push(idCard)
                      setCardId.set(name, ids)
                    } else {
                      setCardId.set(name, [idCard])
                    }
                  }
                }
              })
          }
        }
      })

    const setName = Array.from(setCardId.keys())
    const nbCard = Math.floor(Math.random() * 8) + 2
    for (let index = 0; index < nbCard; index++) {
      const setSelectIndice = Math.floor(Math.random() * setName.length)
      const setSelect = setName[setSelectIndice]
      const idsCard = setCardId.get(setSelect)
      if (idsCard) {
        const cardSelectIndice = Math.floor(Math.random() * idsCard.length)
        await mainContract.addCardToBooster(
          'b1',
          setSelect,
          idsCard[cardSelectIndice]
        )
      }
    }
  }
}
