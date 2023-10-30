// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Admin.sol";
import "./Collection.sol";
import "./NFT.sol";

/// @title A contract that manages the collections and the NFT
/// @author The name of the author
/// @notice The contract to retrieve all informations from the different sets
contract Main{
	int private count;
	mapping(string => Collection) private collections;
	mapping(address => User) private users;
	NFT private nft;

	constructor(address _initialOwner) Admin(_initialOwner) {
		count = 0;
		nft = new NFT(_initialOwner);
	}


	function createCollection(string calldata _name, int _cardCount) external onlyAdmin{
		require(collections[_name] == Collection(0x0), "Collection with the same name already exists.");
		collections[_name] = new Collection(_name, _cardCount, owner());
		count++;
	}

	/*  création avec une URI
	function AddCardToCollection(string memory _collectionName, string memory _nameCard, string memory _URI)
	external onlyAdmin{ 
	*/
	function AddCardToCollection(string memory _collectionName, string memory _nameCard, 
			uint _cadrdNumber, string memory _img) external onlyAdmin {
		Collection collection = collections[_collectionName];
		require(address(collection) != address(0), "Collection does not exist.");
		collection.addCard(_nameCard, _URI);
	}

	function mintAndAssign(string calldata _nameCollection, string calldata _nameCard, address _to, address _tokenUser) external onlyAdmin {
		Collection collection = collections[_collectionName];
		require(address(collection) != address(0), "Collection does not exist.");
		uint256 cardId = collection.getCard(_nameCard).mintTo(_to);
		User user =users(_tokenUser);
    	user.addCardtoUser(cardId);
	}
}