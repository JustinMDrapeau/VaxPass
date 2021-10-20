const express = require ("express");
const router = express.Router();

const contract = require("../artifacts/contracts/vaxNFT.sol/MyNFT.json");
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

    var tokenURI = nftContract.tokenURI(nft_id);

    // Extract JSON from tokenURI
    // Convert into object
    // Return object
});

module.exports = router;