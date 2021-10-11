const express = require("express");
require('dotenv').config()

// Routes
const profile = require("./routes/api/profile.js");

var app = express();

const port = process.env.PORT || 5000

app.use("/api/profile", profile);

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})