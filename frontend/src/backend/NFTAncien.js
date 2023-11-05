/*import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import { ethers } from 'ethers';

import {mainAddress, mainABI} from "./constants.js"
import { useWallet } from '@/App.js';*/
/*
export async function mintNFT(collectionName : string, cardNumber : string) {
    const wallet = useWallet();
    if (wallet) {
        const mainContract = wallet?.contract;
        const account = wallet.details.account;
        if(account) {

        }

        provider.getSigner().getAddress().then(async (address) => {
            const mint = await contract.mintAndAssign(collectionName, cardNumber, address);
            await mint.wait()
        });
    }
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(mainAddress, mainABI, provider);

        provider.getSigner().getAddress().then(async (address) => {
            const mint = await contract.mintAndAssign(collectionName, cardNumber, address);
            await mint.wait()
        });
        

    }
}

export async function transferNFT(collectionName : string, cardNumber : string, owner : string, buyer : string) {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(mainAddress, mainABI, provider);

        provider.getSigner().getAddress().then(async (address) => {
            const mint = await contract.mintAndAssign(collectionName, cardNumber, address);
        await mint.wait()
        });
        

    }
}*/
