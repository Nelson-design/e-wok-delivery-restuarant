const JWT = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    try {
        console.log(req.headers);
        const longToken = req.headers.authorization;
        if (!longToken) {
            return res.status(401).json({
                message: "Token not present",
            });
        }

        const token = longToken.split(" ")[1];
        let user = JWT.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            message: err.message,
        });
    }
};

const CheckIfAdmin = (req, res, next) => {
    try {
        console.log(req.headers);
        const longToken = req.headers.authorization;
        if (!longToken) {
            return res.status(401).json({
                message: "Token not present"
            });
        }

        const token = longToken.split(" ")[1];
        let user = JWT.verify(token, process.env.JWT_SECRET);
        if (user.isAdmin) {
            req.user = user;
            next();
        } else {
            return res.status(403).json({
                message: "Forbidden, only admin can do this operation"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: err.message,
        });
    }
};

const superAdmin = (req, res, next) => {
    try {
        console.log(req.headers);
        const longToken = req.headers.authorization;
        if (!longToken) {
            return res.status(401).json({
                message: "Token not present",
            });
        }
        const token = longTpken.split(" ")[1];
        let user = JWT.verify(token, process.env.JWT_SECRET);
        if (user.superAdmin) {
            req.user = user;
            next();
        } else {
            return res.status(403).json({
                message: "Forbiden, only SuperAdmin can perform this operation",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: err.message,
        });
    }
};

module.exports = {
    verifyToken,
    CheckIfAdmin,
    superAdmin,
};