import * as fs from 'fs';
import * as readline from 'readline';

import {dataPath} from "./constants.js"
import { useWallet } from '@/App';

export async function loadCollection() {
  const wallet = useWallet();
  if (wallet != undefined) {
    const mainContract = wallet?.contract;

    const sets = dataPath + "sets.json";
      fetch(sets)
      .then(response => response.json())
      .then(async data => {
        if (data.length > 0) {
          for (const obj of data) {
            const name = obj.name;
            const cardCount = obj.total;
            const transaction = await mainContract.createCollection(name, cardCount);
            await transaction.wait();
            
            const fileStream = fs.createReadStream(data + name + 'CardsId.txt');
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            rl.on('line', (line: string) => {
                fetch('${data}/${name}/${line}.json')
                .then(response => response.json())
                .then(async card => {
                  const transaction = await mainContract.AddCardToCollection(name, card.id, '${data}/${name}/${line}.json');
                  await transaction.wait();
                })
            });

            rl.on('close', () => { });
            
          }
        } else {
          console.log('Aucun objet JSON trouvé.');
      }
      });

  }
    
}