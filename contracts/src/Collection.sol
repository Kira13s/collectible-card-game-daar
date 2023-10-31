// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFT.sol";

/// @title A contract that represent a set of NFT
/// @author The name of the author
/// @notice Stores information on the cards in the collection
/// @dev Keep an uri for each card in a collection to retrieve the metadata about the card
contract Collection {
	Admin private  admin;
	string public name;
	uint public cardCount;
	// nombre de cartes ajouté à la collection
	uint public size;
	// Mapping from name of the card to the card
	mapping(uint => NFT) private cards;

	constructor(string memory _name, uint _cardCount, admin _admin) {
		name = _name;
		cardCount = _cardCount;
		admin = _admin;
		size = 0;
	}

	/// @dev Access modifier for admin-only functionality
    modifier onlyAdmin() {
        require(msg.sender == admin.owner());
        _;
    }
	/*  création avec une URI
	function addCard(string memory _name, string memory _URI) external onlyAdmin{ 
	*/
	function addCard(uint _cardNumber, string memory _img) external onlyAdmin{
		require(size < cardCount, "Collection is full.");
		NFT newCard = new NFT(_cardNumber, _img);
		cards[_cardNumber] = newCard;
		size++;
	}

	function getCard(uint _cardNumber) public view returns (NFT) {
		NFT card = cards[_cardNumber];
		require(address(card) != address(0), "Card does not exist.");
		return card;
	}

  
}