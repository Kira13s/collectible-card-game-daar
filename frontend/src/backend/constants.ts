const mainJSON = require("../../contracts/artifacts/src/Admin.sol/Admin.json");
export const mainABI = mainJSON.abi;
export const mainAddress = '00x5fbdb2315678afecb367f032d93f642f64180aa3';

export const dataPath = "../../data/";
export const setsName = ["Base","Fossil", "Jungle", "Wizards Black Star Promos"]

const setJSON = require("../../contracts/artifacts/src/Collection.sol/Collection.json");
export const setABI = setJSON.abi;

const cardJSON = require("../../contracts/artifacts/src/NFT.sol/NFT.json");
export const cardABI = cardJSON.abi;