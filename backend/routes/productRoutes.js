const express = require("express");
const router = express.Router();

const {
    getProducts,
    addProduct
} = require("../controllers/productController");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Product list
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/", addProduct);

module.exports = router;