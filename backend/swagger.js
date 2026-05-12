const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gluten-Free Celiac Support System API",
            version: "1.0.0",
            description: "API documentation for Gluten-Free product management system"
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;