// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title A contract that represent a card
/// @author The name of the author
/// @notice The contract represent a card from a specific collection that can be mint and assign
/// @dev Compliant with OpenZeppelin's implementation of the ERC721 spec draft
contract NFT is ERC721, Ownable {
    uint256 private _nextTokenId = 1; // Pour générer des IDs uniques pour chaque copie de carte
    string public collectionName;

    // PKMN pour pokémon
    constructor(string memory _name) ERC721(_name, "PKMN") Ownable(msg.sender) {}

    // Fonction pour créer une nouvelle copie de carte
    function safeMint(address _to) public onlyOwner {
        require(_to != address(0), "Invalid address");
        uint256 tokenId = _nextTokenId++;
        _safeMint(_to, tokenId);
    }

}

