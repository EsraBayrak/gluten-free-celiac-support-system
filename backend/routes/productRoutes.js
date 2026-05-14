const express = require("express");
const router = express.Router();

const {
    getProducts,
    addProduct,
    removeProduct,
    editProduct
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

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete("/:id", removeProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put("/:id", editProduct);
router.put("/:id", editProduct);

module.exports = router;