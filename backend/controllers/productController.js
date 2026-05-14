const productService = require("../services/productService");

const getProducts = (req, res) => {
    productService.getAllProducts((err, products) => {
        if (err) {
            return res.status(500).json({ message: "Database error." });
        }

        return res.status(200).json(products);
    });
};

const addProduct = (req, res) => {
    const { name, brand, category, glutenStatus } = req.body;

    if (!name || !brand || !category || !glutenStatus) {
        return res.status(400).json({
            message: "Required fields are missing."
        });
    }

    productService.createProduct(req.body, (err, productId) => {
        if (err) {
            return res.status(500).json({ message: "Database error." });
        }

        return res.status(201).json({
            message: "Product created successfully.",
            productId
        });
    });
};

const removeProduct = (req, res) => {
    const { id } = req.params;

    productService.deleteProduct(id, (err, changes) => {
        if (err) {
            return res.status(500).json({ message: "Database error." });
        }

        if (changes === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        return res.status(200).json({
            message: "Product deleted successfully."
        });
    });
};
const editProduct = (req, res) => {
    const { id } = req.params;
    const { name, brand, category, glutenStatus } = req.body;

    if (!name || !brand || !category || !glutenStatus) {
        return res.status(400).json({
            message: "Required fields are missing."
        });
    }

    productService.updateProduct(id, req.body, (err, changes) => {
        if (err) {
            return res.status(500).json({ message: "Database error." });
        }

        if (changes === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        return res.status(200).json({
            message: "Product updated successfully."
        });
    });
};

module.exports = {
    getProducts,
    addProduct,
    removeProduct,
    editProduct
};