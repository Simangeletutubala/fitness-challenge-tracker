import { useState, useEffect } from 'react';
import {get} from '../../api';

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        get(`leaderboard`).then(res => {
            if (res?.length > 0) {              
                setLeaders(res)
            }
        });
    }, []);

    return (
        <div class="container">
            <h2 className="text-xl font-bold">Leaderboard</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Challenge</th>
                        <th>User</th>
                        <th>Points</th>
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
        </div>
    );
}

export default Leaderboard;
