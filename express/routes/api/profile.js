const express = require ("express");
const router = express.Router();
const { contract } = require('../../utils/contract');

// @route   GET api/profile/vaccinations
// @desc    Get all of user's vaccination NFTs
// @access  Public                                          TODO: make this PRIVATE
router.get("/vaccinations", (req, res) => {

    // Get user id from request body
    var userId = req.query.id;

    // TODO: Query DB for user's wallet address
    var userWallet = "0x4CBA51c5FA1847B208eD0D753eeA2000D82943Bc";

    contract.methods.tokensOfOwner(userWallet).call()
        .then((result) => {
            res.json({success: true, data: result, message: "Retrieved vaccination history successfully."})
        })
        .catch((err) => {
            res.json({success: false, data: [], message: "Failed to retrieve vaccination history."})
        })
});

module.exports = router;