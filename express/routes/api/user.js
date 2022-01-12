const bcrypt = require ("bcryptjs");
const express = require ("express");
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3()

const User = require("../../models/User");
const Wallet = require("../../models/Wallet");
const Country = require("../../models/Country");
const Identification = require("../../models/Identification");

const httpResponse = require("../../utils/http-response-creator");
const validateRegisterInput = require("../../validation/register");

// @route   POST api/user/create
// @desc    Create user object and corresponding wallet to store NFTs 
// @access  Public
router.post("/", async (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return httpResponse(res, 400, errors);
    }

    const { email, password, firstName, lastName, country, healthCardNumber } = req.body;

    try {
        var user = new User({ email, password, firstName, lastName });
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(user.password, salt);
        if (!hash) {
            throw err;
        }
        user.password = hash;
        await user.save();
    } catch {
        return httpResponse(res, 500, { user: null, message: "Failed to create user! Please try again later." });
    }

    try {
        const account = web3.eth.accounts.create();
        var wallet = new Wallet({ user: user.id, address: account.address, privateKey: account.privateKey });
        await wallet.save();

    } catch {            
        User.findByIdAndDelete(user.id)
            .catch(() => { console.log("Failed to cleanup the created VaxPass user!"); })
        
        return httpResponse(res, 500, { user: null, message: "Failed to create VaxPass wallet! Please try again later." });
    }

    try {
        const country_object = await Country.findOne({name: country});
        const identification = Identification({ identificationNumber: healthCardNumber, type: "HC", user: user.id, country: country_object.id});
        await identification.save();

        httpResponse(res, 201, { id: user.id, message: "Patient, Identification, and VaxPass wallet successfully created!" });
    } catch {
        User.findByIdAndDelete(user.id)
            .catch(() => { console.log("Failed to cleanup the created VaxPass user!"); })

        Wallet.findByIdAndDelete(wallet.id)
            .catch(() => { console.log("Failed to cleanup the created VaxPass wallet!"); })
        
        return httpResponse(res, 500, { user: null, message: "Failed to create user identification! Please try again later." });
    }
})

module.exports = router;
