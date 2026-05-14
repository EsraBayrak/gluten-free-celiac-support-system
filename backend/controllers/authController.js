const db = require("../db");

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    db.get(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error."
                });
            }

            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            return res.status(200).json({
                message: "Login successful.",
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        }
    );
};

module.exports = { login };