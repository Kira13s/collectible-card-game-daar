import { ethers } from 'ethers';

const mainJSON = require("../../contracts/artifacts/src/Admin.sol/Admin.json");
const mainABI = mainJSON.abi;
const mainAddress = '00x5fbdb2315678afecb367f032d93f642f64180aa3';

const sets = "../../data/sets.json";

export async function loadCollection() {
    console.log("init");

    // Vérifie si MetaMask est installé et connecté
    if (window.ethereum) {
      // Crée une instance de Web3Provider à partir de window.ethereum
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Récupère l'adresse du compte connecté
      provider.getSigner().getAddress().then((address) => {
        console.log(`Adresse du compte connecté : ${address}`);
      });

      const contract = new ethers.Contract(mainAddress, mainABI, provider);
    
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
            console.log(`Name: ${name}, ID: ${cardCount}`);
            
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