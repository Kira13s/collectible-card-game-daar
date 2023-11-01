// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./NFT.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title That contract represent a booster
/// @author The name of the author
/// @notice A set of cards that a player can buy
contract Booster is ERC721{
    Admin private  admin;
    NFT[] public cards;
    uint cardCount;
    uint public cost;
    uint private _nextTokenId = 1;
    uint public size = 0;

    constructor(Admin _admin, string memory _name, uint _cost, uint _cardCount) ERC721(_name, "BPKMN") {
        admin = _admin;
        cost = _cost;
        cardCount = _cardCount;
    }

    /// @dev Access modifier for admin-only functionality
    modifier onlyAdmin() {
        require(msg.sender == admin.owner());
        _;
    }

    /// Ajoute une carte  dans le booster
    /// @param card carte a ajouté dans le booster
    function addCard(NFT card) external onlyAdmin {
        require(size < cardCount, "Booster is full.");
        cards.push(card);
    }

    /// Attribuer les cartes du booster à _to
    /// @param _to addresse de l'acheteur
    function mintTo(address _to) external onlyAdmin{
        _safeMint(_to, _nextTokenId);
        _nextTokenId++;
        for (uint i = 0; i < cards.length; i++) {
            cards[i].mintTo(_to);
        }
    }

}