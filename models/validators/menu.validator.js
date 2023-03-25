const joi = require("joi");

const menuSchema = joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    description: joi.string().required(),
    image: joi.string(),
});

const menuUpdateSchema = joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    description: joi.string().required(),
    image: joi.string(),
});

const validateMenuSchema = (req, res, next) => {
    try {
        let { error, value } = menuSchema.validate(req.body);
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

const validateMenuUpdateSchema = (req, res, next) => {
    try {
        let { error, value } = menuUpdateSchema.validate(req.body);
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
    validateMenuSchema,
    validateMenuUpdateSchema
};