const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../controllers/authController");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token is required."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token."
        });
    }
};

module.exports = verifyToken;