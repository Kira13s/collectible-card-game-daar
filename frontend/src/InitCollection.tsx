import { ethers } from 'ethers';
import * as fs from 'fs';
import * as readline from 'readline';

const mainJSON = require("../../contracts/artifacts/src/Admin.sol/Admin.json");
const mainABI = mainJSON.abi;
const mainAddress = '00x5fbdb2315678afecb367f032d93f642f64180aa3';

const data = "../../data/";

export async function loadCollection() {
  console.log("test");
    // Vérifie si MetaMask est installé et connecté
    if (window.ethereum) {
      // Crée une instance de Web3Provider à partir de window.ethereum
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Récupère l'adresse du compte connecté
      provider.getSigner().getAddress().then((address) => {
        console.log(`Adresse du compte connecté : ${address}`);
      });

      const contract = new ethers.Contract(mainAddress, mainABI, provider);
      const sets = data + "sets.json";
      fetch(sets)
      .then(response => response.json())
      .then(async data => {
        let i = 0;
        if (data.length > 0) {
          // Parcours des objets JSON
          for (const obj of data) {
            const name = obj.name;
            const cardCount = obj.total;
            const transaction = await contract.createCollection(name, cardCount);
            await transaction.wait();
            
            const fileStream = fs.createReadStream(data + name + 'CardsId.txt');
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity // Permet de gérer les fins de ligne universelles (CR, LF, CRLF)
            });

            // Utilisez l'interface readline pour lire le fichier ligne par ligne
            rl.on('line', (line: string) => {
                fetch('${data}/${name}/${line}.json')
                .then(response => response.json())
                .then(async card => {
                  const transaction = await contract.AddCardToCollection(name, card.id, '${data}/${name}/${line}.json');
                  await transaction.wait();
                })
            });

            // Événement déclenché lorsque la lecture du fichier est terminée
            rl.on('close', () => { });
            
            const cardsJson = data + "/" + name;
            i++;
            if(i == 3){
                break;
             }
          }
        } else {
          console.log('Aucun objet JSON trouvé.');
      }
      });
      //const signer = provider.getSigner(); // Le compte Ethereum de l'utilisateur
      //const contractWithSigner = contract.connect(signer);

      
    } else {
      console.log('MetaMask n\'est pas installé ou non connecté.');
    }

    
}