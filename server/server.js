const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path");
const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
let jsonParser = bodyParser.json();
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/api", (req,res) => {
    res.json({"users":["abc","cde","efg"]})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
