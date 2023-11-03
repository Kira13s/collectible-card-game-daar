// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Admin.sol";

/// @title A contract that represent a card
/// @author The name of the author
/// @notice The contract represent a card from a specific collection that can be mint and assign
/// @dev Compliant with OpenZeppelin's implementation of the ERC721 spec draft
contract NFT is ERC721 {

    uint private _nextTokenId = 1; // Pour générer des IDs uniques pour chaque copie de carte
    Admin private  admin;
    string public cardNumber; 
    string public uri;

    address[] public  owners;
    mapping(address => uint256) private indexesOwner;

    // PKMN pour pokémon
    constructor(string memory _cardNumber, string memory _uri, Admin _admin) ERC721("NFT", "PKMN") {
        cardNumber = _cardNumber;
        uri = _uri;
        admin = _admin;
    }

    /// @dev Access modifier for admin-only functionality
    modifier onlyAdmin() {
        require(msg.sender == admin.owner());
        _;
    }

    /**
     * @dev See {ERC721- _update}.
     */
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721) returns (address){
        address res = super._update(to, tokenId, auth);
        address from = _ownerOf(tokenId);

        // Cas où, from ne posséde plus de NFT
        if(balanceOf(from) == 0) {
            uint256 index = indexesOwner[from];

            address lastOwner = owners[owners.length - 1];
            owners[index - 1] = lastOwner;
            indexesOwner[lastOwner] = index;

            delete indexesOwner[from];
            owners.pop();
        }

        if (indexesOwner[to] == 0) {
            owners.push(to);
            indexesOwner[to] = owners.length;
        }
        
        return res;
    }

    /// @notice To create a new token
    /// @dev Mints a token to an address with a tokenId.
    /// @param _to address of the future owner of the token
    function mintTo(address _to) public onlyAdmin {
        _safeMint(_to, _nextTokenId);
        _nextTokenId++;
    }

    
    /// @notice Returns the total tokens minted so far.
    /// @dev 1 is always subtracted from the Counter since it tracks the next available tokenId.
    function totalSupply() public view returns (uint256) {
        return _nextTokenId - 1;
    }

    
    /// @notice Retourne l'uri des métadonnées de la carte
    function getURI() virtual public view returns (string memory){
        return uri;
    }

}