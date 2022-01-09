const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

// Routes
const profile = require("./routes/api/profile.js");
const user = require("./routes/api/user.js");
const nft = require("./routes/api/nft.js");

var app = express();

// Connect to MongoDB instance
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch ((error) => {
        console.log(error)
    });

const port = process.env.PORT || 5000

app.use("/api/profile", profile);
app.use("/api/user", user);
app.use("/api/nft", nft);


app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})
