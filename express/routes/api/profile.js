const express = require ("express");
const router = express.Router();
const axios = require('axios');

// @route   GET api/profile/vaccinations
// @desc    Get all of user's vaccination NFTs
// @access  Public                                          TODO: make this PRIVATE
router.get("/vaccinations", (req, res) => {

    // Get user id from request body
    var user_id = req.query.id;

    // TODO: Query DB for user's wallet address
    var user_wallet = "0xe535d87c42d21af3166eb00bbace668b13d55ec7";

    // Make query to alchemy to get transaction history
    var body = JSON.stringify({
        "jsonrpc": "2.0",
        "id": 0,
        "method": "alchemy_getAssetTransfers",
        "params": [{
            "fromBlock": "0xA97AB8",
            "toBlock": "0xA97CAC",
            "fromAddress": "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
            "toAddress": user_wallet,
            "contractAddresses": [
                "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
            ],
            "maxCount": "0x5",
            "excludeZeroValue": true,
            "category": [
                "external",
                "token"
            ]
        }]
    });

    axios.post(`https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, body)
        .then( (response) => {
            var transfers = response.data.result.transfers
            // TODO: Formatting response object with clinic info
            res.json({transfers: transfers})
        })
        .catch( (err) => {
            res.json({success: false, message: "Failed to retrieve vaccination history."})
        })
});

module.exports = router;