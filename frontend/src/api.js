// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const post = async (url, payload) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        };
        const response = await axios.post(`${API_URL}/${url}`, payload, config);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const get = async (url) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        };
        const response = await axios.get(`${API_URL}/${url}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const put = async (url, id, payload) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        };
        const response = await axios.put(`${API_URL}/${url}/${id}`, payload, config);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};



