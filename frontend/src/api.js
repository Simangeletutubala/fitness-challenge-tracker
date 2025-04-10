// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
