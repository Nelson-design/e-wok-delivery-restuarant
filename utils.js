const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const ConnectToDB = async () => {
    try {
        console.log(process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
        console.log("Issue connecting to Db" + err.message);
    }
};

const AppStarter = (port) => {
    console.log("Server started on port " + port);
    ConnectToDB();
};

module.exports = {
    ConnectToDB,
    AppStarter,
};

module.exports.ConnectToDB = ConnectToDB;