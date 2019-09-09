const express = require("express");
const first = express.Router();

first.get("/", (req, res) => {
    console.log(req)
    // check validation
    // if true => call controllers
})

module.exports = first;