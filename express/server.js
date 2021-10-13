const express = require("express");
require('dotenv').config()

// Routes
const profile = require("./routes/api/profile.js");
const user = require("./routes/api/user.js");

var app = express();

const port = process.env.PORT || 5000

app.use("/api/profile", profile);
app.use("/api/user", user);

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})