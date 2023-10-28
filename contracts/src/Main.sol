// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";
import "./NFT.sol";

/// @title A contract that manages the collections and the NFT
/// @author The name of the author
/// @notice The contract to retrieve all informations from the different sets
contract Main is Ownable{
  int private count;
  mapping(string => Collection) private collections;
  NFT private nft;

  constructor(address _initialOwner) Ownable(_initialOwner) {
    count = 0;
    nft = new NFT(_initialOwner);
  }


  function createCollection(string calldata _name, int _cardCount) external {
    require(collections[_name] == Collection(0x0), "Collection with the same name already exists.");
    collections[_name] = new Collection(_name, _cardCount);
    count++;
  }

    function AddToCollection(string memory _collectionName, string memory _nameCard, string memory _tokenURI) public onlyOwner {
        Collection collection = collections[_collectionName];
        require(address(collection) != address(0), "Collection does not exist.");
        collection.addCard(_nameCard, _tokenURI);
    }

  function mintAndAssign(string calldata _nameCollection, string calldata _nameCard, address _to) {
    Collection collection = collections[_collectionName];
    require(address(collection) != address(0), "Collection does not exist.");
    string _tokenURI = collection.getCard(_nameCard);
    nft.safeMint(_to, tokenURI);
  }
}


