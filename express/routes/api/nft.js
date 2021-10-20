const axios = require("axios")
const express = require ("express");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
require('dotenv').config();

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const router = express.Router();
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../../../my-nft/artifacts/contracts/vaxNFT.sol/MyNFT.json")
// TODO: make smart contract address an environment variable
const contractAddress = "0xA8C857AeA4100cfA3DaC98416407bbE55dC8BE3b";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


// @route   GET api/nft/metadata
// @desc    Get all of user's vaccination NFT's metadata
// @access  Public                                          TODO: make this PRIVATE
router.get("/metadata", (req, res) => {

    /**
     * Get nft id from request body
     * Request body gets nft id from the response returned by GET api/profile/vaccinations
     */
    var nft_id = req.query.nft_id;
    var tokenURI = nftContract.methods.tokenURI(nft_id);

    // Extract JSON from tokenURI
    axios.get(tokenURI)
        .then( response => {
            res.json(response)
        })
        .catch(err => res.json(err))

    // convert into object
    // return object
});

module.exports = router;