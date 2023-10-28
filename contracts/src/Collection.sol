// SPDX-License-Identifier: MIT
pragma solidity ^0.8;


/// @title A contract that represent a set of NFT
/// @author The name of the author
/// @notice Stores information on the cards in the collection
/// @dev Keep an uri for each card in a collection to retrieve the metadata about the card
contract Collection {
  string public name;
  uint public cardCount;
  uint public size;
  mapping(string => string) private cards;

  constructor(string memory _name, uint _cardCount) {
    name = _name;
    cardCount = _cardCount;
    size = 0;
  }

  function addCard(string memory _name, string memory _tokenURI) public {
    require(size < cardCount);
    cards[_name] = _tokenURI;
    size++;
  }

  
}

