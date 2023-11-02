const express = require('express');
const app = express();
const port = 3000;

const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // URL

// Adress du contrat deployé
const mainContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const mainArtifact = require('./contracts/deployments/localhost/Main.json');
const abi = mainArtifact.abi;

// ABI du contrat
const mainContractABI = [abi];

// creation d'instance du contrat avec Web3
const mainContract = new web3.eth.Contract(mainContractABI, mainContractAddress);

//trouver un moyen d'avoir directement accès au nft depuis le main deployé
//pour pouvoir recup les infos nécessaires
app.get('/totalSupply', async (req, res) => {
  try {
    //appeler le totalsupply du NFT, pas du main
    const totalSupply = await mainContract.methods.totalSupply().call();
    res.json({ totalSupply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//NB : pas sur que le totalSupply soit utile ici

//idem mais avec l'id
app.get('/nft/:tokenId', async (req, res) => {
  try {
    const tokenId = req.params.tokenId;

    //fonction qui pourrait retourner les infos du NFT en fct de son ID (son num et image)
    const nftInfo = await nftContract.methods.getNFTInfo(tokenId).call();

    res.json({ nftInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
