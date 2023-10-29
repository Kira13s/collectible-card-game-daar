// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Admin.sol";

/// @title A contract that represent a set of NFT
/// @author The name of the author
/// @notice Stores information on the cards in the collection
/// @dev Keep an uri for each card in a collection to retrieve the metadata about the card
contract Collection{
	string public name;
	uint public cardCount;
	// nombre de cartes ajouté à la collection
	uint public size;
	// Mapping from name of the card to the card
	mapping(string => NFT) private cards;

	constructor(string memory _name, uint _cardCount) {
		name = _name;
		cardCount = _cardCount;
		size = 0;
	}

	/*  création avec une URI
	function addCard(string memory _name, string memory _URI) external onlyAdmin{ 
	*/
	function addCard(string memory _name, uint _cadrdNumber, string memory _img) external onlyAdmin{
		require(cards.length < cardCount, "Collection is full.");
		NFT newCard = new NFT(_name, _cadrdNumber, _img);
		cards[_name] = newCard;
		size++;
	}

	function getCard(string memory _name) public view returns (NFT memory) {
		NFT card = cards[_name];
		require(address(card) != address(0), "Card does not exist.");
		return card;
	}

  
}

