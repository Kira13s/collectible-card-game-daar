// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Admin.sol";
import "./Collection.sol";
import "./NFT.sol";
import "./User.sol";
import "./Booster.sol";

/// @title A contract that manages the collections and the NFT
/// @author The name of the author
/// @notice The contract to retrieve all informations from the different sets
contract Main is Admin{
	int private count;
	mapping(string => Collection) private collections;
	mapping(address => User) private users;
	mapping (string => Booster) boosters;

	constructor() {
		count = 0;
	}


	/**
	 * Crée une collection
	 * @param _name  nom de la collection
	 * @param _cardCount nombre de carte de la collection
	 */
	function createCollection(string calldata _name, uint _cardCount) external onlyOwner{
		require(address(collections[_name]) == address(0), "Collection with the same name already exists.");
		collections[_name] = new Collection(_name, _cardCount, this);
		count++;
	}

	/*  création avec une URI
	function AddCardToCollection(string memory _collectionName, string memory _nameCard, string memory _URI)
	external onlyAdmin{ 
	*/
	/// Ajoute une carte à une collection
	/// @param _collectionName Collection sélectionné pour l'ajout 
	/// @param _cardNumber id de la carte 
	/// @param _img image de la carte
	function AddCardToCollection(string memory _collectionName, 
			uint _cardNumber, string memory _img) external onlyOwner {
		Collection collection = collections[_collectionName];
		require(address(collection) != address(0), "Collection does not exist.");
		collection.addCard(_cardNumber, _img);
	}

	/// Mint et assigne une carte à un utilisateur
	/// @param _nameCollection collection de la carte à mint
	/// @param _cardNumber id de la carte choisie
	/// @param _to addresse de l'utilisateur à qui on va affecté la carte
	function mintAndAssign(string calldata _nameCollection, uint _cardNumber, address _to) external onlyOwner {
		Collection collection = collections[_nameCollection];
		require(address(collection) != address(0), "Collection does not exist.");
		NFT card = collection.getCard(_cardNumber);
		card.mintTo(_to);
		users[_to].addCardtoUser(card);
	}


	/// Création d'un booster
	/// @param _name Nom du booster
	/// @param _cost coût que l'on doit payer pour acquérir le booster
	/// @param _cardCount nombre de carte dans le booster
	function createBooster(string memory _name, uint _cost, uint _cardCount) external onlyOwner {
			require(address(boosters[_name]) == address(0), "Booster with the same name already exists.");
			
			Booster booster = new Booster(this, _name, _cost, _cardCount);
			boosters[_name] = booster;
	}

	/*Ajout création avec une uri */
	/// Ajoute une carte dans un booster
	/// @param _boosterName Nom du booster dans lequel on va ajouté une carte
	/// @param _collectionName Nom de la collection de la carte à ajouté
	/// @param _cardNumber Id de la carte à ajouté
	function addCardToBooster(string memory _boosterName, string memory _collectionName, uint _cardNumber)
		external onlyOwner {
			Booster booster = boosters[_boosterName];
			require(address(booster) != address(0), "Booster does not exist.");
			Collection collection = collections[_collectionName];
			require(address(collection) != address(0), "Collection does not exist.");

			NFT card = collection.getCard(_cardNumber);
			booster.addCard(card);
		}

	/// Achat d'un booster
	/// @param _to addresse de l'acheteur
	/// @param _boosterName Nom du booster
	function buyBooster(address _to, string memory _boosterName)  external payable{
		Booster booster = boosters[_boosterName];
		require(address(booster) != address(0), "Booster does not exist.");
		require(msg.value >= booster.cost(), "insufficient funds");
		booster.mintTo(_to);
	}

	
}