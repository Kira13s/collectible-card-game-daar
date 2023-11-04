import { ethers } from 'ethers';

import {mainAddress, mainABI} from "./constants.js"

export async function mintNFT(collectionName : string, cardNumber : string) {
	if (window.ethereum) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		// Récupère l'adresse du compte connecté
		provider.getSigner().getAddress().then((address) => {
			console.log(`Adresse du compte connecté : ${address}`);
		});

		const contract = new ethers.Contract(mainAddress, mainABI, provider);

		provider.getSigner().getAddress().then(async (address) => {
			const mint = await contract.mintAndAssign(collectionName, cardNumber, address);
    	await mint.wait()
		});
		

	}
}