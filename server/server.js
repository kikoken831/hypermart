const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path");
const pool = require("./common/db")
const {json} = require("express");
const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
let jsonParser = bodyParser.json();
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/api", async (req,res) => {
    await pool.query("SELECT * FROM accounts", (err,results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows);
    });
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
