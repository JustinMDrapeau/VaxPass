//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId); // user_id_address -> nft_id
        _setTokenURI(newItemId, tokenURI); //nft_id -> metadata

        return newItemId;
    }

     function transferNFT(address from, address to)
        public onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _tokenIds.current(); //Transfer the nft that was just created
        address ownerAddress = ownerOf(tokenId); // Get the owner address 

        require(from == ownerAddress,"Ownership mismatch");

        approve(to, tokenId); // Approve the transfer

        safeTransferFrom(from, to, tokenId); 
        _tokenIds.decrement();

        return tokenId;
    }
}