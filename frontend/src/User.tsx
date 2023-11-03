import { ethers } from 'ethers';

const mainJSON = require("../../contracts/artifacts/src/Admin.sol/Admin.json");
const mainABI = mainJSON.abi;
const mainAddress = '00x5fbdb2315678afecb367f032d93f642f64180aa3';

export async function getCardUser() {
    // Vérifie si MetaMask est installé et connecté
    if (window.ethereum) {
        // Crée une instance de Web3Provider à partir de window.ethereum
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(mainAddress, mainABI, provider);
        // Récupère l'adresse du compte connecté
        provider.getSigner().getAddress().then((address) => {
          console.log(`Adresse du compte connecté : ${address}`);
        });
  
        
    }
}