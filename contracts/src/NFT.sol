// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
    uint256 private _nextTokenId = 1; // Pour générer des IDs uniques pour chaque copie de carte

    // PKMN pour pokémon
    constructor(string memory _name, address initialOwner) ERC721(_name, "PKMN"), Ownable(initialOwner) {}

    // Fonction pour créer une nouvelle copie de carte
    function safeMint(address to) public onlyOwner {
        require(to != address(0), "Invalid address");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

}

