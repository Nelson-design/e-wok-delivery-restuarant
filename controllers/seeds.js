// const User = require("../../models/user.model");

// const seedSuperAdmin = async () => {
//     const superAdmin = await User.fndOne({
//         email: process.env.SUPERADMINEMAIL,
//     });

//     if (superAdmin) {
//         return console.log("Admin, Super Admin already created");
//     }

//     seededAdmin = await User({
//         isAdmin: true,
//         passowrd: process.env.SUPERADMINPASSWORD,
//         username: process.env.SUPERADMINUSERNAME,
//         email: process.env.SUPERADMINEMAIL,
//         fullName: process.env.SUPERADMINFULLNAME,
//         phone: "String",
         
//     });

//     seededAdmin.save();
//     console.log("Super Admin created with email" + seededAdmin.toJSON().email);
//     return seededAdmin;
// };

// seededAdmin();
