const fs = require('fs')
const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/code", (req, res) => {
    res.json({ msg: "code route" });
})

const execute = require("./compile");

// app.use("/", express.static("./public"));

app.post('/code/submit', (req, res) => {
    const { code, input, lang } = req.body;
    return execute(code, input)
        .then(data => {
            res.json(data)
        })
})

app.listen(5000, () => {
    console.log("server started at port 5000");
})