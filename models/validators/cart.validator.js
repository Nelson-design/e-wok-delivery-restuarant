const joi = require("joi");

const cartSchema = joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    description: joi.string().required(),
    image: joi.string(),
});

const cartUpdateSchema = joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    description: joi.string().required(),
    image: joi.string(),
});

const validateCartSchema = (req, res, next) => {
    try {
        let { error, value } = cartSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            message: " Server Issue",
        });
    }
};

const validateCartUpdateSchema = (req, res, next) => {
    try {
        let { error, value } = cartUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error,
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            message: "Server Issue"
        });
    }
};

module.exports = {
    validateCartSchema,
    validateCartUpdateSchema
};