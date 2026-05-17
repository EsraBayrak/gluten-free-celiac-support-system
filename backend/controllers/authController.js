const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "gluten_free_secret_key";

const register = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        function (err) {
            if (err) {
                return res.status(400).json({
                    message: "User already exists."
                });
            }

            return res.status(201).json({
                message: "User registered successfully.",
                userId: this.lastID
            });
        }
    );
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error."
                });
            }

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Login successful.",
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        }
    );
};

module.exports = {
    register,
    login,
    SECRET_KEY
};