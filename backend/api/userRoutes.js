// api/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route to create a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();
        
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

// GET route to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        console.log('Fetched Users:', users);  // Log the fetched users
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);  // Log the error
        res.status(400).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;
