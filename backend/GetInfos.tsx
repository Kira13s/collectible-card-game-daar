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
  return new Promise((resolve) => {  
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(mainAddress, mainABI, provider);

        const nbCard = await contract.getCardCountCollection(nameSet);
        await nbCard.wait();

        var infos= {}
        for (let index = 0; index < nbCard; index++) {
          const element = array[index];
          
        }
    
        
    }
  })
}