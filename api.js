const express = require("express");
const api = express();
const {
    indexController,
    notFoundController,
    authController,
    middlewares,
    cartController,
} = require("./controllers");
const {
    validateSignupMiddleware,
    validateLoginMiddleware,
    validatePasswordChangeMiddleware,
} = require("./models/validators/auth.validator");
const port = 4500
const { AppStarter } = require("./utils");

//Form reading Middleware configuration
api.use(express.json());
api.use(
    express.urlencoded({
    extended: true,
})
);

console.log()

api.get("/", indexController);

api.post("/signup", validateSignupMiddleware, authController.SignupController);
api.post("/login", validateLoginMiddleware, authController.LoginController);
api.put("/password", validatePasswordChangeMiddleware, middlewares.verifyToken, authController.ChangePasswordController);
api.post("/forgot-password", authController.PasswordResetController);

api.get("/cart", cartController.getAllFoodCarts);
api.get("/cart/:id", cartController.getFoodCartById);
api.post("/cart", cartController.createFoodCart);
api.put("/cart/:id", cartController.updateFoodCartById);
api.delete("/cart/:id", cartController.deleteFoodCart);

api.all("*", notFoundController);
api.listen(port, AppStarter(port));