import { ethers } from 'ethers';

import {mainAddress, mainABI, dataPath} from "./constants.js"

async function buyBooster() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(mainAddress, mainABI, provider);
        const cardCount = await boosterContract.methods.cardCount().call();
        const cost = await boosterContract.methods.cost().call();

        console.log('Card Count:', cardCount);
        console.log('Cost:', cost);

        // Appel à une fonction pour acheter un booster
        await boosterContract.methods.mintTo(userAddress).send({ from: userAddress, value: cost });

        console.log('Booster acheté avec succès !');
    } catch (error) {
        console.error("Erreur lors de l'achat du booster :", error);
    }
}
