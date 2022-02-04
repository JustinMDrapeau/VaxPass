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
        address mintAddress; // The clinic address
        string manufacturer;
        uint dosePhase;
    }

    struct Clinic {
        string name;
        string p_address;
        string email;
    }

    mapping(uint256 => TokenInfo) public tokenIdToTokenInfo;

    mapping(address => string) public walletIdToPatientHash;

    mapping(address => Clinic) public walletIdToClinic;


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

    function mintNFT(string memory _manufacturer, uint _dosePhase) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId); // clinic_address -> nft_id
        
        tokenIdToTokenInfo[newItemId] = TokenInfo(_msgSender(),_manufacturer, _dosePhase);
        return newItemId;
    }

    function patientSignup(string memory _hash) public returns (string memory) {
        walletIdToPatientHash[_msgSender()] = _hash;
        return walletIdToPatientHash[_msgSender()];
    }

    function clinicSignup(string memory _name, string memory _p_address, string memory _email) public returns (Clinic memory) {
        walletIdToClinic[_msgSender()] = Clinic(_name, _p_address, _email);
        return walletIdToClinic[_msgSender()];
    }

    function transferNFT(address toAddress) public returns (uint256) {
        // Token being transfered from clinic address to patient address
        uint256 tokenId = _tokenIds.current();
        // Address of the owner of the NFT
        address ownerAddress = ownerOf(tokenId);
        // Assert that the owner of the NFT is the clinic (msgSender)
        require(_msgSender() == ownerAddress, "msgSender is not the owner of the NFT");

        // Change the approved for an NFT to the patient (toAddress)
        approve(toAddress, tokenId);
        // Transfer NFT from clinic (msgSender) to patient (toAddress)
        safeTransferFrom(_msgSender(), toAddress, tokenId); 
        return tokenId;
    }

    // function tokenURI(uint256 tokenId) public view override returns (string memory) {
    //     return string(
    //         abi.encodePacked(
    //         "data:application/json;base64,",
    //             Base64.encode(
    //                 bytes(
    //                     abi.encodePacked(
    //                         '{"name":"Vax NFT",',
    //                         '"description":"An NFT for vaccinations", "attributes":"", "firstName":"',
    //                         tokenIdToTokenInfo[tokenId].firstName,
    //                         '", "lastName":"',
    //                         tokenIdToTokenInfo[tokenId].lastName,
    //                         '","manufacturer":"',
    //                         tokenIdToTokenInfo[tokenId].manufacturer,
    //                         '", "dosePhase":"',
    //                         Strings.toString(tokenIdToTokenInfo[tokenId].dosePhase),
    //                         '","origin":"',
    //                         abi.encodePacked(tokenIdToTokenInfo[tokenId].mintAddress),
    //                         '"}'
    //                     )
    //                 )
    //             )
    //         )
    //     );
    // }
}