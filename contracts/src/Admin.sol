// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";


/// @title A contract that manages special access privileges
/// @author The name of the author
/// @notice Grant the admin exclusive access to specific functions
contract Admin is Ownable{

    constructor() Ownable(msg.sender) {}

    /// @dev Access modifier for admin-only functionality
    modifier onlyAdmin() {
        _checkOwner();
        _;
    }
}
