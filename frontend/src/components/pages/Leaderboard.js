import { useState, useEffect } from 'react';
import {get} from '../../api';

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        get(`leaderboard`).then(res => {
            if (res?.length > 0) {
                console.log(res);
                setLeaders(res)
            }
        });
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <td>Challenge</td>
                        <td>User</td>
                        <td>Points</td>
                    </tr>
                </thead>
                <tbody>
                {leaders.map((user, index) => (
                
                    <tr>
                        <td>{user.challenge_name}</td>
                        <td>{user.name}</td>
                        <td>{user.points}</td>
                    </tr>
                   
                ))}
                </tbody>
            </table>
            <ul>
                {leaders.map((user, index) => (
                    <li key={index}>{index + 1} {user.name} Challenge {user.challenge_name} - {user.points} points</li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
