const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
require('dotenv').config();

const API_URL = "https://eth-ropsten.alchemyapi.io/v2/YP1lq3MVFwDLVAD5jz2dqU0gDTDzWBGp";
const web3 = createAlchemyWeb3(API_URL);

const contractArtifact = require("../../my-nft/artifacts/contracts/vaxNFT.sol/VaxNFT.json")

// TODO: make smart contract address an environment variable
const contractAddress = "0x09f442C41E5b5dC9d37c41668ED4e9AE277B551C";
const contract = new web3.eth.Contract(contractArtifact.abi, contractAddress);

module.exports = { contract };