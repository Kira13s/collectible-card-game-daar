import { ethers } from 'ethers';

import { useWallet } from '@/App.js';

export async function buyBooster(name: string) : Promise<boolean> {
    return new Promise(async (resolve) => {
			try {
				const wallet = useWallet();
				if (wallet) {
					const provider = wallet.details.provider;
					const account = wallet.details.account;
					const contract = wallet.contract;
					if(account && contract){
						provider.getBalance(account).then(async (balance) => {
							const balanceInEther = ethers.utils.formatEther(balance);
							const cost = await contract.getCostBooster(name);
							await cost.wait();

							if (balanceInEther >= cost) {
									const transaction = await contract.buyBooster(account, name);
									await transaction.wait();
									resolve(true);
									
							}
								
						}).catch((error) => {
								console.error('Erreur lors de la récupération du solde :', error);
						});
					}
							
				}
			} catch (error) {
					console.error("Erreur lors de l'achat du booster :", error);
			}
		})
}
