const mongoose = require("mongoose");
const Country = require("./Country");
const User = require("./User");
const Schema = mongoose.Schema;

const IdentificationSchema = new Schema({
    identificationNumber: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Country,
        required: true,
    },
})

var Identification = mongoose.model ("Identification", IdentificationSchema);

module.exports = Identification;
