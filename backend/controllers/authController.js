const authService = require('../services/authService');

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        const data = await authService.registerUser({ name, email, password });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Authenticate user
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('Please provide email and password');
        }

        const data = await authService.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};
