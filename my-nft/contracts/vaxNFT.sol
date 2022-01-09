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
        address mintAddress;
        string firstName;
        string lastName;
        string manufacturer;
        uint dosePhase;
    }

    mapping(uint256 => TokenInfo) public tokenIdTokenInfo;

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
                    result[resultIndex] = tokenIdTokenInfo[vaccineId];
                    resultIndex++;
                }
            }
            return result;
        }
    }

    function mintNFT(string memory _firstName, string memory _lastName, string memory _manufacturer, uint _dosePhase) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_msgSender(), newItemId); // user_id_address -> nft_id
        
        tokenIdTokenInfo[newItemId] = TokenInfo(_msgSender(), _firstName, _lastName, _manufacturer, _dosePhase);
        return newItemId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(
            abi.encodePacked(
            "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"Vax NFT",',
                            '"description":"An NFT for vaccinations", "attributes":"", "firstName":"',
                            tokenIdTokenInfo[tokenId].firstName,
                            '", "lastName":"',
                            tokenIdTokenInfo[tokenId].lastName,
                            '","manufacturer":"',
                            tokenIdTokenInfo[tokenId].manufacturer,
                            '", "dosePhase":"',
                            Strings.toString(tokenIdTokenInfo[tokenId].dosePhase),
                            '","origin":"',
                            abi.encodePacked(tokenIdTokenInfo[tokenId].mintAddress),
                            '"}'
                        )
                    )
                )
            )
        );
    }
}