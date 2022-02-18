//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "base64-sol/base64.sol";

contract VaxNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct TokenInfo {
        address issuer;
        string product;
        string lot;
        uint phase;
        string date;
    }

    struct Clinic {
        string name;
        string p_address;
        string email;
    }

    mapping(uint256 => TokenInfo) public tokenIdToTokenInfo;

    mapping(address => string) public walletIdToPatientHash;

    mapping(address => Clinic) public walletIdToClinic;

    event Vaccine(uint256 tokenId);

    constructor() public ERC721("VaxNFT", "NFT") {}

    /// @notice Returns a list of all token URIs assigned to an address.
    /// @param _owner The owner whose VaxNFTs we are interested in.
    function tokensOfOwner(address _owner) public returns(TokenInfo[] memory) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new TokenInfo[](0);
        } else {
            TokenInfo[] memory result = new TokenInfo[](tokenCount);
            uint256 totalVaccines = _tokenIds.current();
            uint256 resultIndex = 0;

            // We count on the fact that all vaccines have IDs starting at 1 and increasing
            // sequentially up to the totalVaccine count.
            uint256 vaccineId;
            for (vaccineId = 1; vaccineId <= totalVaccines; vaccineId++) {
                if (ownerOf(vaccineId) == _owner) {
                    result[resultIndex] = tokenIdToTokenInfo[vaccineId];
                    resultIndex++;
                }
            }
            return result;
        }
    }

    function mintNFT(string memory _product, string memory _lot, uint _phase, string memory _date) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId);
        
        tokenIdToTokenInfo[newItemId] = TokenInfo(_msgSender(), _product, _lot, _phase, _date);

        emit Vaccine(newItemId);

        return newItemId;
    }

    function patientSignup(string memory _hash) public returns (string memory) {
        walletIdToPatientHash[_msgSender()] = _hash;
        return walletIdToPatientHash[_msgSender()];
    }

    function clinicSignup(string memory _name, string memory _p_address, string memory _email, address _walletId) public returns (Clinic memory) {
        walletIdToClinic[_walletId] = Clinic(_name, _p_address, _email);
        return walletIdToClinic[_walletId];
    }

}