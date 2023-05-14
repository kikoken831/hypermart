const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path");
const app = express()
const PORT = process.env.PORT || 8000;

//services
const {login} = require("./service/authentication")
const {getAllItems, updateItem, deleteItem, createItem} = require("./service/itemService");
const {getAllCategory} = require("./service/categoryService");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
let jsonParser = bodyParser.json();
app.use(express.static(path.join(__dirname, "../client/build")));
//login api
app.post("/api/login", jsonParser, async (req, res) => {
    await login(req, res);
});

//get all items api
app.get("/api/items", async (req, res) => {
    await getAllItems(req, res);
});
app.get("/api/category", async (req, res) => {
    await getAllCategory(req, res);
});

//update item by id api
app.put("/api/items/:id", jsonParser, async (req, res) => {
    await updateItem(req, res);
});

//delete item by id api
app.delete("/api/items/:id", async (req, res) => {
    await deleteItem(req, res);
});

//create item api
app.post("/api/items", jsonParser, async (req, res) => {
    await createItem(req, res);
});
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

