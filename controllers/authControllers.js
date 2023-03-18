// const cloudinary = require('cloudinary').v2;
const { userModel } = require('../schema/user');
const jwt = require('jsonwebtoken');
let jwtkey = process.env.jwtKey


// Handle user sign up
const signUp = async (req, res) => {
    const userData = req.body;
    // console.log(userData);
    try {
        await userModel.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
        });
        console.log(userData);
        console.log('User added successfully!');
        res.status(201).send('User added successfully!');
    } catch (error) {
        console.log('Error occurred in sign up',error);
        res.status(400).send({ error: 'Server Error' });
    }
};

// Handle user login
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await userModel.findOne({ email, password });
        // console.log(user);
        if (!user) {
            res.status(401).send('Invalid email or password');
        } else {
            // Generate token
            const userPayload = { email: user.email, name: user.name };
            const token = jwt.sign(userPayload, jwtkey, { expiresIn: '1d' });
            // console.log(token);
            res.cookie('jwt', token, { httpOnly: true });
            res.status(200).send('Login successful');
        }
    } catch (error) {
        console.log('Error occurred in login', error);
        res.status(500).send({ error: 'Server Error' });
    }
};

// Handle user logout
const logout = async (req, res) => {
    // console.log(req.cookie);
    res.cookie('jwt', '');
    res.status(200).send('Logout successful'); 
    console.log('Logout done from the backend side');
};


// Export the functions
module.exports = {
    signUp,
    login,
    logout
};