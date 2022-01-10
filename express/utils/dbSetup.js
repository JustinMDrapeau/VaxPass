const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;

const User = require("../models/User")
const Clinic = require('../models/Clinic')
const Country = require('../models/Country')
const Identification = require('../models/Identification')
const Wallet = require('../models/Wallet')

// Connect to MongoDB instance
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch ((error) => {
        console.log(error)
    });

User.create({
    email: "tharseken.n@gmail.com",
    password: "vaxpass123",
    firstName: "Tharseken",
    lastName: "N"
})
    .then((res) => {
        console.log("User successfully created.")
    })
    .catch((err) => {
        console.log("Error in user creation.")
    })

Country.create({
    name: "Canada",
    code: "CAN"
})
    .then((res) => {
        console.log("Country successfully created.")
    })
    .catch((err) => {
        console.log("Error in country creation.")
    })

Clinic.create({
    email: "sickchildren@gmail.com",
    password: "vaxpass123",
    name: "The Hospital for Sick Children",
    address: "555 University Ave, Toronto, ON M5G 1X8",
    country: mongoose.Types.ObjectId("61db3951d761eca0f3d61579")
})
    .then((res) => {
        console.log("Clinic successfully created.")
    })
    .catch((err) => {
        console.log("Error in clinic creation.")
    })

Identification.create({
    identificationNumber: "123-456-7890-AB",
    type: "Healthcard",
    user: mongoose.Types.ObjectId("61db387f8ae8c1d5619d35ba"),
    country: mongoose.Types.ObjectId("61db3951d761eca0f3d61579")
})
    .then((res) => {
        console.log("Identification successfully created.")
    })
    .catch((err) => {
        console.log("Error in identification creation.")
    })

Wallet.create({
    user: mongoose.Types.ObjectId("61db387f8ae8c1d5619d35ba"),
    address: "0x1234567890",
    privateKey: "e9-ejdf09234"
})
    .then((res) => {
        console.log("Wallet successfully created.")
    })
    .catch((err) => {
        console.log("Error in wallet creation.")
    })