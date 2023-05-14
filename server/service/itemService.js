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

module.exports = {getAllItems, updateItem, deleteItem}