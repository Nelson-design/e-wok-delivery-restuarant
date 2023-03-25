const joi = require("joi");

const signupSchema = joi.object({
    fullname: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    password: joi.string().min(6).required(),
});

const LoginSchema = joi.object({
    username: joi.string(),
    email: joi.string(),
    password: joi.string().min(6).required(),
}).or("email", "username");

const validateSignupMiddleware = (req, res, next) => {
    try {
        let { error, value } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            message: "Server issue"
        });
    }
};

const validateLoginMiddleware = (req, res, next) => {
    try {
        let { error, value } = LoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            message: " Server issue"
        });
    }
};

const validatePasswordChangeMiddleware = (req, res, next) => {
    try {
        let { error, value } = PasswordChangeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            message: "Server issue"
        });
    }
};

module.exports = {
    validateSignupMiddleware,
    validateLoginMiddleware,
    validatePasswordChangeMiddleware
};