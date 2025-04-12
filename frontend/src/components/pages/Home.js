import { useState, useEffect } from 'react';
import {get} from '../../api';

function Home() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        get(`leaderboard`).then(res => {
            if (res.data?.length > 0) {
                setLeaders(res.data)
            }
        });
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

export default Home;
