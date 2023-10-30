contract User{
	string public name;
    NFT[] private listeCartes;

	constructor(string memory _name) {
        name = _name;
    }

    function addCardtoUser(uint26 cardId) external {
        require(nftContract.exists(cardId), "La carte avec cet ID n'existe pas");
        listeCartes.push(cardId);
    }

}