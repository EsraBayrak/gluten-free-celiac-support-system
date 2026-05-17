const db = require("../db");

const getAllProducts = (callback) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        callback(err, rows);
    });
};
const getProductsByUserId = (userId, callback) => {
    db.all(
        "SELECT * FROM products WHERE userId = ?",
        [userId],
        (err, rows) => {
            callback(err, rows);
        }
    );
};
const createProduct = (product, callback) => {
    const { name, brand, category, glutenStatus, ingredients, notes, userId } = product;

    db.run(
    `
    INSERT INTO products
    (name, brand, category, glutenStatus, ingredients, notes, userId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [name, brand, category, glutenStatus, ingredients, notes, userId],
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
function calculateSafePercentage(products) {
    if (products.length === 0) return 0;

    const safeProducts = products.filter(
        p => p.glutenStatus === "Safe"
    );

    return Math.round((safeProducts.length / products.length) * 100);
}
function isValidGlutenStatus(status) {
    return ["Safe", "Risky", "Unknown"].includes(status);
}
function isDuplicateProduct(products, newProduct) {
    return products.some(product =>
        product.name.toLowerCase() === newProduct.name.toLowerCase() &&
        product.brand.toLowerCase() === newProduct.brand.toLowerCase()
    );
}
module.exports = {
    getAllProducts,
    getProductsByUserId,
    createProduct,
    deleteProduct,
    updateProduct,
    calculateSafePercentage,
    isValidGlutenStatus,
    isDuplicateProduct
};

