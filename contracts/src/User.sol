// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./NFT.sol";

/// @title That contract manage un user and its NFTs
/// @author The name of the author
/// @notice Keep track of a user's NFTs.
contract User{
	string public name;
    NFT[] public  cards;
    mapping(NFT => uint256) private indexes;

	constructor(string memory _name) {
        name = _name;
    }

    
    function contains(NFT card) internal  view returns(bool) {
        return indexes[card] != 0;
    }

    function addCardtoUser(NFT card) external {
        if (!contains(card)) {
            cards.push(card);
            indexes[card] = cards.length;
        }
    }

    function removeCardtoUser(NFT card) external {
        require(contains(card), "Does not contain such card");
        uint256 index = indexes[card];

        // moves last element to the place of the card
        // so there are no free spaces in the array
        NFT lastCard = cards[cards.length - 1];
        cards[index - 1] = lastCard;
        indexes[lastCard] = index;

        delete indexes[card];
        cards.pop();
    }

}