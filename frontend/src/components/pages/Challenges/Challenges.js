import { useState, useEffect } from 'react';
import {get} from '../../../api';
import { Link } from "react-router-dom";

function Challenges() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        get('challenges').then(res => {
            if (res?.length > 0) {
                setChallenges(res)
            }
        });
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold">Challenges</h2>
            <Link to="/CreateChallenge" className="title">
                Create Challenge
            </Link>
            
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Start Date</td>
                        <td>End Date</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                {challenges.map(ch => (
                    <tr key={ch._id}>
                        <td>
                            {ch.name}
                        </td>
                        <td>
                            {ch.description}
                        </td>  
                        <td>
                            {ch.start_date}
                        </td>  
                        <td>
                            {ch.end_date}
                        </td>  
                        <td><Link to={"/ViewChallenge" }
                                state={ch} >View Challenge</Link></td>   
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Challenges;
