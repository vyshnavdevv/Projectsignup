const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

// Signup route
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

// Login route
app.post('/login', [
    check('email', "Email must be between 10 to 30 characters").isEmail().isLength({ min: 10, max: 30 }),
    check('password', "Password must be between 8 to 10 characters").isLength({ min: 8, max: 10 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.error("Error querying data:", err);
            return res.status(500).json("Error");
        }
        if (data.length > 0) {
            const user = data[0];
            if (user.password === req.body.password) {
                return res.status(200).json({ message: "Success", user: user });
            } else {
                return res.status(401).json("Password did not match");
            }
        } else {
            return res.status(404).json("User not found");
        }
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
