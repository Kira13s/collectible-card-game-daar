import { ethers } from 'ethers';

import {mainAddress, mainABI, dataPath} from "./constants.js"

export async function buyBooster(name: string) : Promise<boolean> {
    return new Promise(async (resolve) => {
			try {
				if (window.ethereum) {
							const provider = new ethers.providers.Web3Provider(window.ethereum);
							const contract = new ethers.Contract(mainAddress, mainABI, provider);

							provider.getSigner().getAddress().then(async (userAddress) => {
									provider.getBalance(userAddress).then(async (balance) => {
											const balanceInEther = ethers.utils.formatEther(balance);
											const cost = await contract.getCostBooster(name);
											await cost.wait();

											if (balanceInEther >= cost) {
													const transaction = await contract.buyBooster(userAddress, name);
													await transaction.wait();
													resolve(true);
													
											}
											
									}).catch((error) => {
											console.error('Erreur lors de la récupération du solde :', error);
									});
							});
							
				}
			} catch (error) {
					console.error("Erreur lors de l'achat du booster :", error);
			}
		})0
}
