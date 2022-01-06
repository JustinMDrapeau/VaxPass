# VaxPass Blockchain

Edit the smart contract in the following path:

> ./contracts/vaxNFT.sol

## Compile the smart contract

Run the following command:

> npx hardhat compile

This command generates hardhat specific interfaces to interact with your NFT and check syntax

## Deploy the smart contract

Run the following command:

> npx hardhat run scripts/deploy.js --network ropsten

This returns a smart contract address (the blockchain address to which the smart contract is deployed to). Go to Ropsten Etherscan [website](https://ropsten.etherscan.io) and paste it in to view the smart contract details

## Mint an NFT 

Set the `contractAddress` variable, in `scripts/mint-nft.js`, and run the following command:

> node scripts/mint-nft.js

You can set the `tokenURI` to a URL containing the JSON to be minted as an NFT. Here is an example [URL](https://gateway.pinata.cloud/ipfs/QmVfbVxXNiu8sy2wC5n6SRTsrLHSM3XL1b24mDYQ5YqbmH)

