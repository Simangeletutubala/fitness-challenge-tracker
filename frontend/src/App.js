import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Login from './pages/Login';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import Progress from './pages/Progress';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    return (
        <Router>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Fitness Challenge Tracker</h1>
                <Routes>
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/challenges" element={user ? <Challenges /> : <Navigate to="/login" />} />
                    <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/login" />} />
                    <Route path="/progress" element={user ? <Progress /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
