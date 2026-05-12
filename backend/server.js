const express = require("express");
const cors = require("cors");

const db = require("./db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.json({
        message: "Gluten-Free Celiac Support System API Running"
    });
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});