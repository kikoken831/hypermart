const jwt = require('jsonwebtoken');
const pool = require('../common/db');

async function getAllItems(req, res) {
    try {
        const items = await pool.query(
            "SELECT *,concat(item_id,',',items.category_id) as comp_id FROM items join category on items.category_id = category.category_id order by item_name asc"
        );
        res.json(items.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

async function updateItem(req, res) {
    //check if user is logged in
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Access Denied");
    }
    try {
        const {id} = req.params;
        const {item_name, item_desc, item_price, item_quantity} = req.body;
        const item = await pool.query("UPDATE items SET item_name = $1, item_desc = $2, item_price = $3, item_quantity = $4 WHERE item_id = $5 RETURNING *", [item_name, item_desc, item_price, item_quantity, id]);
        res.json(item.rows[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

async function deleteItem(req, res) {
    try {
        const {id} = req.params;
        const item = await pool.query("DELETE FROM items WHERE item_id = $1 RETURNING *", [id]);
        res.json(item.rows[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

//create item api
async function createItem(req, res) {
    try {
        const {item_name, item_desc, item_price, item_quantity, category_id, item_image} = req.body;
        const item = await pool.query("INSERT INTO items (item_name, item_desc, item_price, item_quantity, category_id, item_image, created_on) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *", [item_name, item_desc, item_price, item_quantity, category_id, item_image]);
        res.json(item.rows[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = {getAllItems, updateItem, deleteItem, createItem}