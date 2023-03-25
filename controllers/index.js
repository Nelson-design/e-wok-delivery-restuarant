const authController = require("./auth.controller");
const middlewares = require("./middlewares");
const cartController = require("./cart.controller");


const indexController = (req, res) => {
    return res.status(200).json({
        message: "Welcome to E-wok restaurant Api"
    });
};

const notFoundController = (req, res) => {
    return res.status(400).json({
        message: "Bad request"
    });
};

module.exports = {
    authController,
    indexController,
    notFoundController,
    cartController,
    middlewares,
};