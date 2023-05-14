const jwt = require('jsonwebtoken');
const pool = require('../common/db');

async function getAllCategory(req, res) {
    try {
        const items = await pool.query(
            "SELECT * FROM category"
        );
        res.json(items.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = {getAllCategory}