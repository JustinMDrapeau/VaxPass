const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
})

var Wallet = mongoose.model ("Wallet", WalletSchema);

module.exports = Wallet;
