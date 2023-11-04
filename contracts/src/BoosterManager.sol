// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Admin.sol";
import "./NFT.sol";
import "./Booster.sol";

contract BoosterManager {
	Admin private admin;
    uint private count;
	mapping (string => Booster) private boosters;

	constructor(Admin _admin) {
        admin = _admin;
        count = 0;
    }

	/// @dev Access modifier for admin-only functionality
    modifier onlyAdmin() {
        require(msg.sender == admin.owner());
        _;
    }

	/// Getter sur un booster particulièr
    /// @param _boosterName nom du booster a retourné
    function getBooster(string memory _boosterName) public view returns (Booster) {
        Booster booster = boosters[_boosterName];
		require(address(booster) != address(0), "Booster does not exist.");
        return booster;
    }

	/// Retourne l'addresse d'un booster spécifique
	/// @param _boosterName booster dont on veut l'addresse
	function getBoosterAddress(string memory _boosterName) public view onlyAdmin returns (address) {
		Booster booster = getBooster(_boosterName);
		return address(booster);		
	}
	/**
     * @dev See {Main- createBooster}.
     */
	function createBooster(string memory _name, uint _cost, uint _cardCount) external onlyAdmin {
			require(address(boosters[_name]) == address(0), "Booster with the same name already exists.");
			
			Booster booster = new Booster(admin, _name, _cost, _cardCount);
			boosters[_name] = booster;
	}

	/**
	 * Ajoute une carte dans un booster
	 * @param _boosterName nom du booster où va avoir lieu l'ajout
	 * @param card carte à ajouté
	 */
	function addCardToBooster(string memory _boosterName, NFT card)
		external onlyAdmin {
			Booster booster = getBooster(_boosterName);
			booster.addCard(card);
		}

	/**
     * @dev See {Main- buyBooster}.
     */
	function buyBooster(address _to, string memory _boosterName)  external payable{
		Booster booster = getBooster(_boosterName);
		require(msg.value >= booster.cost(), "insufficient funds");
		booster.mintTo(_to);
	}

	function getCostBooster(string memory _boosterName) external view returns (uint) {
		return getBooster(_boosterName).cost();	
	}

}