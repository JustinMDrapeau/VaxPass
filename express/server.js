const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const cors = require("cors");

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

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS whitelist
app.use(cors({
    origin: 'http://localhost:3000'
}));

const port = process.env.PORT || 5000

app.use("/api/profile", profile);
app.use("/api/user", user);
app.use("/api/nft", nft);


app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})
