const express = require("express");
require('dotenv').config()

// Routes
const profile = require("./routes/api/profile.js");
const user = require("./routes/api/user.js");
const nft = require("./routes/api/nft.js");

var app = express();

const port = process.env.PORT || 5000

app.use("/api/profile", profile);
app.use("/api/user", user);
app.use("/api/nft", nft);


app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})
