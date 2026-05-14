const db = require("../db");

const getAllProducts = (callback) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        callback(err, rows);
    });
};

const createProduct = (product, callback) => {
    const { name, brand, category, glutenStatus, ingredients, notes } = product;

    db.run(
        `
        INSERT INTO products
        (name, brand, category, glutenStatus, ingredients, notes)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [name, brand, category, glutenStatus, ingredients, notes],
        function (err) {
            callback(err, this.lastID);
        }
    );
};

const deleteProduct = (id, callback) => {
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        callback(err, this.changes);
    });
};
const updateProduct = (id, product, callback) => {
    const { name, brand, category, glutenStatus, ingredients, notes } = product;

    db.run(
        `
        UPDATE products
        SET name = ?, brand = ?, category = ?, glutenStatus = ?, ingredients = ?, notes = ?
        WHERE id = ?
        `,
        [name, brand, category, glutenStatus, ingredients, notes, id],
        function (err) {
            callback(err, this.changes);
        }
    );
};
module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
};

