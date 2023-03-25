const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const User = require("../models/user.model");


const SignupController = async (req, res) => {
    try {
        // Check if a user already exist with same username or email
        let userExist = await User.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }]
        });

        if (userExist) {
            return res.status(400).json({
                message: "Account exists, Login instead",
            });
        }

        const user = new User(req.body);
        const token = user.generateToken();
        await user.save();
        return res.status(201).json({
            message: "Account Created",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                phone: user.phone,
                username: user.username,
            },
            token,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server issues",
        });
    }
};

const LoginController = async (req, res) => {
    try {
        // Make a call to the mongo DB to check if the user exist
        let userExist = await User.findOne({
            $or: [{ email: req.body.email }, { username: req.body.username }],
        });

        // Return error if user has no account
        if (!userExist) {
            return res.status(404).json({
                message: "You have no account Signup Instead",
            });
        }

        // Check if the password is authentic
        const passwordCorrect = userExist.checkPassword(req.body.password);
        if (!passwordCorrect) {
            return res.status(400).json({
                message: "Incorrect Password",
            });
        }

        // Generate Token
        const token = userExist.generateToken();

        // Send token and user data to the client
        return res.status(200).json({
            message: "Login Sucessful",
            token,
            user: {
                _id: userExist._id,
                fullName: userExist.fullName,
                email: userExist.email,
                phone: userExist.phone,
                username: userExist.username,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Issue",
        });
    }
};

const ChangePasswordController = async (req, res, next) => {
    try {
        // Get request body
        const { password, oldPassword } = req.body;

        // Find user with id inside of token
        const user = await User.findById(req.user._id);

        // Verify the old password 
        let passwordCorrect = user.checkPassword(oldPassword);
        if (!passwordCorrect)
            return res.status(400).json({
                message: "Incorrect Password",
            });
        
        // Set the password key
        user.password = password;

        // Call the modelInstance .save() method
        user.save();
        return res.status(200).json({
            message: "PAssword changed successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: " Internal server issues",
        });
    }
};

const PasswordResetController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({
            message: "email required",
        });
           
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({
            message: "User Not Found"
        });

        const templatePath = path.join(process.cwd(), "/views/index.ejs");
        const body = await ejs.renderFile(templatePath, { user, url });
        await sendEmail({
            receiver: user.email,
            subject: "E-wok password Reset",
            body: body,
        });
        res.status(200).json({
            message: "Password reset steps sent, check your mail"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server issues"
        });
    }
};

module.exports = {
    SignupController,
    LoginController,
    ChangePasswordController,
    PasswordResetController,
};