const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./glutenfree.db", (err) => {
    if (err) {
        console.log("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            brand TEXT NOT NULL,
            category TEXT NOT NULL,
            glutenStatus TEXT NOT NULL,
            ingredients TEXT,
            notes TEXT,
            favorite INTEGER DEFAULT 0
        )
    `);

    db.get(
        "SELECT * FROM users WHERE email = ?",
        ["admin@gmail.com"],
        (err, row) => {

            if (!row) {

                db.run(
                    "INSERT INTO users (email, password) VALUES (?, ?)",
                    ["admin@gmail.com", "123456"]
                );

                console.log("Default user created.");
            }
        }
    );
});

module.exports = db;
