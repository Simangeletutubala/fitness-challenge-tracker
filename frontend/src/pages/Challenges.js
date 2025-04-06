import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Challenges() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/challenges`).then(res => setChallenges(res.data));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Challenges</h2>
            <ul>
                {challenges.map(ch => (
                    <li key={ch._id}>{ch.title} - Created by {ch.createdBy.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Challenges;
