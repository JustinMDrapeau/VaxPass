const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
require('dotenv').config();

const API_URL = "https://eth-ropsten.alchemyapi.io/v2/YP1lq3MVFwDLVAD5jz2dqU0gDTDzWBGp";
const web3 = createAlchemyWeb3(API_URL);

const contractArtifact = require("../../my-nft/artifacts/contracts/vaxNFT.sol/VaxNFT.json")

// TODO: make smart contract address an environment variable
const contractAddress = "0xFf1EAe5e568F4c2e7382BD64fAE29F6Ba78D64b3";
const contract = new web3.eth.Contract(contractArtifact.abi, contractAddress);

module.exports = { contract };