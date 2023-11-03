import { ethers } from 'ethers';

import {mainAddress, mainABI} from "./constants.js"

export async function getCardUser() : Promise<string[]>{
  return new Promise((resolve) => {  
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(mainAddress, mainABI, provider);

        provider.getSigner().getAddress().then(async (address) => {
          const transaction = await contract.createCollection(address);
          await transaction.wait();
          resolve(transaction);
        });
    
        
    }
  })
}

export async function getSetsOwner(nameSet) {
  return new Promise(async (resolve) => {  
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(mainAddress, mainABI, provider)

        const cardsId = await contract.getCardIdCollection(nameSet);
        await cardsId.wait();

        var infos= {}
        cardsId.forEach(async cardId => {
          const owners = await contract.getUsersCardCollection(nameSet, cardId);
          await owners.wait();
          infos[cardId] = owners; 
        });
    
        resolve(infos);
        
    }
  })
}