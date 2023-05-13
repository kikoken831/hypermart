const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs");
const path = require("path");
const pool = require("./common/db")
const {json} = require("express");
const app = express()
const PORT = process.env.PORT || 8000;

//services
const {login} = require("./service/authentication")

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
let jsonParser = bodyParser.json();
app.use(express.static(path.join(__dirname, "../client/build")));
//login api
app.post("/login",jsonParser, async (req,res) => {
    await login(req, res);
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

