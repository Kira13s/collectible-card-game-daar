// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Admin.sol";
import "./NFT.sol";

/// @title A contract that represent a set of NFT
/// @author The name of the author
/// @notice Stores information on the cards in the collection
contract Collection {
  Admin private  admin;
  string public name;
  uint public cardCount;
  // nombre de cartes ajouté à la collection
	uint public size;
	// Mapping from id of the card to the card
	mapping(string => NFT) private cardid;
  NFT[] public cards;
  address[] public cardsAddress;


  constructor(string memory _name, uint _cardCount, Admin _admin) {
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


  /// Ajoute une carte à la collection
  /// @param _cardNumber id de la carte
  /// @param _uri uri de la carte
	function addCard(string memory _cardNumber, string memory _uri) external onlyAdmin{
		require(size < cardCount, "Collection is full.");
		NFT newCard = new NFT(_cardNumber, _uri, admin);
		cardid[_cardNumber] = newCard;
		size++;
	}

  /// Retourne une carte de la collection
  /// @param _cardNumber id de la carte à retourné
  function getCard(string memory _cardNumber) public view returns (NFT) {
		NFT card = cardid[_cardNumber];
		require(address(card) != address(0), "Card does not exist.");
		return card;
	}

  /// Retourne l'addresse d'un contrat nft
  /// @param _cardNumber id de la carte dont on veut l'addresse
  function getCardAddressID(string memory _cardNumber) external view returns (address) {
        NFT card = getCard(_cardNumber);
        return address(card);
    }
    
  
}
