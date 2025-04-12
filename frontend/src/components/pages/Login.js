import { useState } from 'react';
import axios from 'axios';
import { createUser } from '../../api';
import { Redirect } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function Login({ setUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setLogin] = useState(true);
    const [isAuthorised, setAuth] = useState(false);
   
    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            localStorage.setItem('authToken', res.data.token);
            setAuth(true);        
        } catch (err) {            
            alert('Login failed');
        }
    };

    const handleRegister = async () => {
        setLogin(false) ;
    };

    const handleBactToLogin = async () => {
        setLogin(true) ;
    };

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

    if (isAuthorised) {
        window.location.href = '/';
    }

    return (
        <div>
        {
            isLogin ? (
                <>
                <div className="flex flex-col gap-4">
                    <input type="email" placeholder="Email" className="p-2 border" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="p-2 border" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin} className="bg-blue-500 text-white p-2">Login</button>
                    <button onClick={handleRegister} className="bg-blue-500 text-white p-2">Register an Account</button>
                </div>
                
                </>                           
                ) : (
                    <div className="flex flex-col gap-4">                   
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button  onClick={handleSubmit}>Create User</button>
                        <button onClick={handleBactToLogin} className="bg-blue-500 text-white p-2">Back to Login</button>                    
                    </div>
                
        )}
        </div>
       

        
    );
}

export default Login;
