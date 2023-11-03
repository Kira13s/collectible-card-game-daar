// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Collection.sol";

contract CollectionManager {
    Admin private admin;
    uint private count;
	mapping(string => Collection) private collections;

    constructor(Admin _admin) {
        admin = _admin;
        count = 0;
    }

    /// @dev Access modifier for admin-only functionality
    modifier onlyAdmin() {
        require(msg.sender == admin.owner());
        _;
    }


    /**
     * @dev See {Main- createCollection}.
     */
	function createCollection(string calldata _name, uint _cardCount) external onlyAdmin{
		require(address(collections[_name]) == address(0), "Collection with the same name already exists.");
		collections[_name] = new Collection(_name, _cardCount, admin);
		count++;
	}

    /// Retourne le nombre de collections
    function getCollectionCount() public view returns (uint) {
        return count;
    }

    /// Getter sur une collection particulière
    /// @param _collectionName nom de la collection a retourné
    function getCollection(string memory _collectionName) public view returns (Collection) {
        Collection collection = collections[_collectionName];
		require(address(collection) != address(0), "Collection does not exist.");
        return collection;
    }

    /**
     * @dev See {Main- AddCardToCollection}.
     */
    function AddCardToCollection(string memory _collectionName, 
			string memory _cardNumber, string memory _img) external onlyAdmin {
		Collection collection = getCollection(_collectionName);
		collection.addCard(_cardNumber, _img);
	}

    /// @dev See {Main- getUsersCardCollection}.
    function getUsersCard(string memory _collectionName, string memory _cardNumber) 
        external view returns (address[] memory) {
            Collection collection = getCollection(_collectionName);
            return collection.getUsersCard(_cardNumber);
    }
}
