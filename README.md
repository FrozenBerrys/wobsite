# wobsite
official wobsite, in progress.


to start: "npm run dev" on console
.env variables
MONGO_URI = "VSCode and MongoDB Connection URL"
JWT_SECRET = "anything you want"

to access admin login: append "/admin" to root URL

to create a new admin user: Run this code in admin.js file (with bcrypt and "User" model imported)

// async function addUser(username, password) {
//     try {
//         // Hash the password using bcrypt
//         const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

//         // Create a new user document
//         const newUser = new User({
//             username: username,
//             password: hashedPassword,
//         });

//         // Save the new user to the database
//         await newUser.save();
//         console.log('User added successfully.');
//     } catch (error) {
//         console.error('Error adding user:', error);
//     }
// }

// // Usage example: Replace 'admin' and 'adminPassword' with actual username and password values
// addUser('admin', 'adminpassword');

das about it.



