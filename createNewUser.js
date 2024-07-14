const bcrypt = require('bcrypt');
const user = require('./server/models/User');
async function addUser(username, password) {
    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Create a new user document
        const newUser = new User({
            username: username,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();
        console.log('User added successfully.');
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// // Usage example: Replace 'admin' and 'adminPassword' with actual username and password values
// addUser('admin', 'adminpassword');
//  uncomment this to run. 