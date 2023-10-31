// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Admin.sol";
import "./User.sol";

/// @title A contract that represent a card
/// @author The name of the author
/// @notice The contract represent a card from a specific collection that can be mint and assign
/// @dev Compliant with OpenZeppelin's implementation of the ERC721 spec draft
contract NFT is ERC721 {

    uint private _nextTokenId = 1; // Pour générer des IDs uniques pour chaque copie de carte
    Admin private  admin;
    uint public cardNumber;
    string public img;
    /*Actuellement, on stocke les champs des métadonnée. Mais quand l'API sera créé,
    il faudra stocker l'uri de notre API: string public URI */

    address[] public  owners;
    mapping(address => uint256) private indexesOwner;

    // PKMN pour pokémon
    constructor(uint _cadrdNumber, string memory _img, Admin _admin) ERC721("NFT", "PKMN") {
        cardNumber = _cadrdNumber;
        img = _img;
        admin = _admin;
    }

    /// @dev Access modifier for admin-only functionality
    modifier onlyAdmin() {
        require(msg.sender == admin.owner());
        _;
    }


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

    /* Fonction a implémenté quand on aure une API pour le frontend
    function baseTokenURI() virtual public pure returns (string memory){
        return URL de notre API
    }

    function tokenURI(uint256 _tokenId) override public pure returns (string memory) {
        return string(abi.encodePacked(baseTokenURI(), Strings.toString(_tokenId)));
    }*/

}