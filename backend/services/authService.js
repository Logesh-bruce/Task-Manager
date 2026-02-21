const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Register a new user
 * @param {Object} userData - User name, email, password
 * @returns {Promise<Object>} Created user and token
 */
const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        };
    } else {
        throw new Error('Invalid user data');
    }
};

/**
 * Authenticate user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Authenticated user and token
 */
const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        };
    } else {
        throw new Error('Invalid email or password');
    }
};

module.exports = {
    registerUser,
    loginUser
};
