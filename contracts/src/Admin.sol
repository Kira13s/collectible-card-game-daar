// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A contract that implements an admin
/// @author The name of the author
/// @notice Grant the admin exclusive access to specific functions
/// @dev has a modifier to throw an error if a fucntion is call by someone else than the admin
contract Admin is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    /// @notice Throws if called by any account other than the admin.
    modifier onlyAdmin() {
        onlyOwner();
        _;
    }
}
