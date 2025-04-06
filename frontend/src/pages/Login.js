import { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = 'http://localhost:5000/api';

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            setUser(jwtDecode(res.data.token));
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="p-2 border" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="p-2 border" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="bg-blue-500 text-white p-2">Login</button>
        </div>
    );
}

export default Login;
