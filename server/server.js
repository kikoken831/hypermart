const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
let jsonParser = bodyParser.json();

app.get("/api", (req,res) => {
    res.json({"users":["abc","cde","efg"]})
})

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})
