const mongoose = require("mongoose");
const Country = require("./Country");
const Schema = mongoose.Schema;

const ClinicSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Country,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

var Clinic = mongoose.model ("Clinic", ClinicSchema);

module.exports = Clinic;
