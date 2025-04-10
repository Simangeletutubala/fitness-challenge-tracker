// src/components/CreateUser.js
import React, { useState } from 'react';
import { createUser } from '../api';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { name, email, password };
        try {
            const data = await createUser(newUser);
            alert('User created!');
        } catch (error) {
            alert('Error creating user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Create User</button>
        </form>
    );
};

export default CreateUser;
