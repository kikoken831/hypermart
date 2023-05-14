const jwt = require('jsonwebtoken');
const pool = require('../common/db');

async function getAllItems(req, res) {
    try {
        const items = await pool.query(
            "SELECT * FROM items join category on items.category_id = category.category_id"
        );
        res.json(items.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

async function updateItem(req, res) {
    try {
        const {id} = req.params;
        const {name, description, price, quantity} = req.body;
        const item = await pool.query("UPDATE items SET name = $1, description = $2, price = $3, quantity = $4 WHERE item_id = $5 RETURNING *", [name, description, price, quantity, id]);
        res.json(item.rows[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = {getAllItems}