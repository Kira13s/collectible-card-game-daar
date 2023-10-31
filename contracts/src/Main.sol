// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Admin.sol";
import "./Collection.sol";
import "./NFT.sol";
import "./User.sol";

/// @title A contract that manages the collections and the NFT
/// @author The name of the author
/// @notice The contract to retrieve all informations from the different sets
contract Main is Admin{
	int private count;
	mapping(string => Collection) private collections;
	mapping(address => User) private users;

	constructor(address _initialOwner) Admin(_initialOwner) {
		count = 0;
	}


	function createCollection(string calldata _name, uint _cardCount) external onlyOwner{
		require(address(collections[_name]) == address(0), "Collection with the same name already exists.");
		collections[_name] = new Collection(_name, _cardCount, this);
		count++;
	}

	/*  création avec une URI
	function AddCardToCollection(string memory _collectionName, string memory _nameCard, string memory _URI)
	external onlyAdmin{ 
	*/
	function AddCardToCollection(string memory _collectionName, 
			uint _cardNumber, string memory _img) external onlyOwner {
		Collection collection = collections[_collectionName];
		require(address(collection) != address(0), "Collection does not exist.");
		collection.addCard(_cardNumber, _img);
	}

	function mintAndAssign(string calldata _nameCollection, uint _cardNumber, address _to) external onlyOwner {
		Collection collection = collections[_nameCollection];
		require(address(collection) != address(0), "Collection does not exist.");
		NFT card = collection.getCard(_cardNumber);
		card.mintTo(_to);
		users[_to].addCardtoUser(card);
	}
}