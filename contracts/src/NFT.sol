// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Admin.sol";


/// @title A contract that represent a card
/// @author The name of the author
/// @notice The contract represent a card from a specific collection that can be mint and assign
/// @dev Compliant with OpenZeppelin's implementation of the ERC721 spec draft
contract NFT is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _nextTokenId = 1; // Pour générer des IDs uniques pour chaque copie de carte
    uint public cardNumber;
    string public img;
    /*Actuellement, on stocke les champs des métadonnée. Mais quand l'API sera créé,
    il faudra stocker l'uri de notre API: string public URI */

    // PKMN pour pokémon
    constructor(string memory _name, uint _cadrdNumber, string memory _img) ERC721(_name, "PKMN") {
        cardNumber = _cadrdNumber;
        img = _img;
        _nextTokenId.increment();
    }


    /// @notice To create a new token
    /// @dev Mints a token to an address with a tokenId.
    /// @param _to address of the future owner of the token
    function mintTo(address _to) public onlyAdmin {
        uint256 currentTokenId = _nextTokenId.current();
        _nextTokenId.increment();
        _safeMint(_to, currentTokenId);
    }

    
    /// @notice Returns the total tokens minted so far.
    /// @dev 1 is always subtracted from the Counter since it tracks the next available tokenId.
    function totalSupply() public view returns (uint256) {
        return _nextTokenId.current() - 1;
    }

    /* Fonction a implémenté quand on aure une API pour le frontend
    function baseTokenURI() virtual public pure returns (string memory){
        return URL de notre API
    }

    function tokenURI(uint256 _tokenId) override public pure returns (string memory) {
        return string(abi.encodePacked(baseTokenURI(), Strings.toString(_tokenId)));
    }*/

}