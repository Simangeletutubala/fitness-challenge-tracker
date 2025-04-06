import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/leaderboard`).then(res => setLeaders(res.data));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Leaderboard</h2>
            <ul>
                {leaders.map((user, index) => (
                    <li key={user._id}>{index + 1}. {user.name} - {user.points} points</li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
