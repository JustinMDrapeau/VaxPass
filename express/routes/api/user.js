const express = require ("express");
const router = express.Router();


const Web3 = require('web3');



// @route   POST api/user/wallet
// @desc    Create wallet for user (1 account) to store NFTs 
// @access  Public                                          TODO: make this PRIVATE
router.post("/wallet", (req, res) => {


    // to interact with blockchain need to have access to ethereum node
    web3 = new Web3()
    
    
    res.json({wallet : web3.eth.accounts.create()});
  
});

module.exports = router;