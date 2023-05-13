const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../common/db');

async function login(req, res) {
    const {email, password} = req.body;
    const user = await pool.query("SELECT * FROM accounts WHERE email = $1 or username  = $1", [email]);
    if (user.rows.length === 0) {
        return res.status(401).send("Invalid Credentials");
    }
    try {
        if (await bcrypt.compare(password, user.rows[0].password)) {
            const token = jwt.sign({id: user.rows[0].user_id}, process.env.JWT_SECRET);
            res.json({
                token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {
                    values: {
                        id: user.rows[0].user_id,
                        name: user.rows[0].username,
                        email: user.rows[0].email,
                    },
                },
            }).send();
        } else {
            return res.status(401).send("Invalid Credentials");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
}
module.exports = {login}