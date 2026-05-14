const db = require("../db");

const getAllProducts = (callback) => {

    db.all(
        "SELECT * FROM products",
        [],
        (err, rows) => {
            callback(err, rows);
        }
    );
};

const createProduct = (product, callback) => {

    const {
        name,
        brand,
        category,
        glutenStatus,
        ingredients,
        notes
    } = product;

    db.run(
        `
        INSERT INTO products
        (name, brand, category, glutenStatus, ingredients, notes)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            name,
            brand,
            category,
            glutenStatus,
            ingredients,
            notes
        ],
        function (err) {
            callback(err, this.lastID);
        }
    );
};

module.exports = {
    getAllProducts,
    createProduct
};