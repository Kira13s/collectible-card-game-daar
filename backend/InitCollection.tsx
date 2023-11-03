import { ethers } from 'ethers';
import * as fs from 'fs';
import * as readline from 'readline';

import {mainAddress, mainABI, dataPath, setsName} from "./constants.js"

export async function loadCollection() {
  console.log("test");
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Récupère l'adresse du compte connecté
      provider.getSigner().getAddress().then((address) => {
        console.log(`Adresse du compte connecté : ${address}`);
      });

      const contract = new ethers.Contract(mainAddress, mainABI, provider);

      const sets = dataPath + "sets.json";
      fetch(sets)
      .then(response => response.json())
      .then(async data => {
        if (data.length > 0) {
          for (const obj of data) {
            const name = obj.name;
            const cardCount = obj.total;
            const transaction = await contract.createCollection(name, cardCount);
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
                  const transaction = await contract.AddCardToCollection(name, card.id, '${data}/${name}/${line}.json');
                  await transaction.wait();
                })
            });

            rl.on('close', () => { });
            
          }
        } else {
          console.log('Aucun objet JSON trouvé.');
      }
      });

      
    } else {
      console.log('MetaMask n\'est pas installé ou non connecté.');
    }

    
}