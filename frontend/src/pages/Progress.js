import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Progress() {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/progress`).then(res => setProgress(res.data));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Progress Tracker</h2>
            <ul>
                {progress.map((entry, index) => (
                    <li key={index}>{entry.date}: {entry.steps} steps, {entry.calories} cal</li>
                ))}
            </ul>
        </div>
    );
}

export default Progress;
