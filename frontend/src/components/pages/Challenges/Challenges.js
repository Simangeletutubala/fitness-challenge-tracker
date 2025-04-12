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
        <div class="container card mt-2">
            <h2 className="text-xl font-bold">Challenges</h2>
            <div class='card-body'>
                <div class="float-end">
                    <Link to="/CreateChallenge" className="title btn btn-primary">
                        Create Challenge
                    </Link>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th></th>
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
                                {new Date(ch.start_date).toLocaleDateString()}
                            </td>  
                            <td>
                                {new Date(ch.end_date).toLocaleDateString()}
                            </td>  
                            <td><Link to={"/ViewChallenge" }
                                    state={ch} >View Challenge</Link></td>   
                        </tr>
                    ))}
                    </tbody>
                </table>            
            </div>           
        </div>
    );
}

export default Challenges;
