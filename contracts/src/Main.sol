// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Admin.sol";
import "./Collection.sol";
import "./NFT.sol";
import "./User.sol";
import "./Booster.sol";
import "./CollectionManager.sol";
import "./BoosterManager.sol";

/// @title A contract that manages the collections and the NFT
/// @author The name of the author
/// @notice The contract to retrieve all informations from the different sets
contract Main is Admin{
	CollectionManager private collectionManager;
	BoosterManager private boosterManager;
	mapping(address => User) private users;

	constructor(address initialOwner) Admin(initialOwner) {
		collectionManager = new CollectionManager(this);
	}

	function getCollection(string memory _collectionName) internal view returns (Collection) {
		return collectionManager.getCollection(_collectionName);
	}
	
	function getUser(address _userAddress) internal view returns (User) {
		User user = users[_userAddress];
		require(address(user) != address(0), "User does not exist.");
        return user;
	}

	/**
	 * Crée une collection
	 * @param _name  nom de la collection
	 * @param _cardCount nombre de carte de la collection
	 */
	function createCollection(string calldata _name, uint _cardCount) external onlyOwner{
		collectionManager.createCollection(_name, _cardCount);
	}

	
	/// Ajoute une carte à une collection
	/// @param _collectionName Collection sélectionné pour l'ajout 
	/// @param _cardNumber id de la carte 
	/// @param _uri uri de la carte
	function AddCardToCollection(string memory _collectionName, 
			string memory _cardNumber, string memory _uri) external onlyOwner {
		collectionManager.AddCardToCollection(_collectionName, _cardNumber, _uri);
	}

	/// Mint et assigne une carte à un utilisateur
	/// @param _nameCollection collection de la carte à mint
	/// @param _cardNumber id de la carte choisie
	/// @param _to addresse de l'utilisateur à qui on va affecté la carte
	function mintAndAssign(string calldata _nameCollection, string memory _cardNumber, address _to) external onlyOwner {
		Collection collection = getCollection(_nameCollection);
		NFT card = collection.getCard(_cardNumber);
		card.mintTo(_to);
		User user = getUser(_to);
		user.addCardtoUser(card);
	}


	/// Création d'un booster
	/// @param _name Nom du booster
	/// @param _cost coût que l'on doit payer pour acquérir le booster
	/// @param _cardCount nombre de carte dans le booster
	function createBooster(string memory _name, uint _cost, uint _cardCount) external onlyOwner {
			boosterManager.createBooster(_name, _cost, _cardCount);
	}

	/*Ajout création avec une uri */
	/// Ajoute une carte dans un booster
	/// @param _boosterName Nom du booster dans lequel on va ajouté une carte
	/// @param _collectionName Nom de la collection de la carte à ajouté
	/// @param _cardNumber Id de la carte à ajouté
	function addCardToBooster(string memory _boosterName, string memory _collectionName, string memory _cardNumber)
		external onlyOwner {
			Collection collection = getCollection(_collectionName);

			NFT card = collection.getCard(_cardNumber);
			boosterManager.addCardToBooster(_boosterName, card);
		}

	/// Achat d'un booster
	/// @param _to addresse de l'acheteur
	/// @param _boosterName Nom du booster
	function buyBooster(address _to, string memory _boosterName)  external payable{
		boosterManager.buyBooster(_to, _boosterName);
	}

	
	function getCardsUserUri(address userAddress) external view returns(string[] memory){
		User user = getUser(userAddress);
		NFT[] memory cards = user.getCards();
		string[] memory uris;
		uint index = 0;

		for (uint i = 0; i < cards.length; i++) {
            NFT card = cards[i];
			for(uint j = 0; j < card.balanceOf(userAddress); j++) {
				uris[index] = cards[index].uri();
				index++;
			}
            
        }
        return uris;
	}

	function getAddressCollection(string memory _collectionName) external view returns (address) {
        return collectionManager.getAddressCollection(_collectionName);
    }

	function getCostBooster(string memory _boosterName) external view returns (uint) {
		return boosterManager.getCostBooster(_boosterName);
	}
	
}