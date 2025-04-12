import { useState, useEffect } from 'react';
import {post, get} from '../../../api';
import { useLocation} from "react-router-dom";
import { jwtDecode} from "jwt-decode";
function ViewChallenge(props) {
    const location = useLocation();
    const { _id, name, description, start_date, end_date } = location.state;   
    const [participants, setParticipants] = useState([]);   
    const [progressLogs, setProgressLogs] = useState([]);   
    const [isInChallenge, setUserIsInChallenge] = useState(false); 
    const [value, setValue] = useState(false); 
    const [activity_type, setType] = useState(false); 
    const token =  localStorage.getItem('authToken');
    const userId = jwtDecode(token).userId;

    useEffect(() => {       
         get(`challengeParticipants?challenge_id=${_id}`).then(res => {
                if (res?.length > 0) {
                    setParticipants(res);                   
                    let userInChallenge = res.some(u => u.user_id === userId);
                    setUserIsInChallenge(userInChallenge);
                }
            });

            get(`progresslogs?challenge_id=${_id}&user_id=${userId}`).then(res => {
                if (res?.length > 0) {
                    setProgressLogs(res);        
                }
            });
    }, [_id, userId]);

    const handleSave = async () => {
        try {
            await post(`challengeParticipants`, { _id});      
            alert('Successfully joined challenge');                     
        } catch (err) {            
            alert('Failed to join challenge');
        }
    };

    const handleProgress = async () => {
        try {
            await post('progresslogs', {_id, userId, value, activity_type }); 
            get(`progresslogs?challenge_id=${_id}&user_id=${userId}`).then(res => {
                if (res?.length > 0) {
                    setProgressLogs(res);        
                }
            });     
            alert('Progress saved successfully');                     
        } catch (err) {            
            alert('Failed to save progress');
        }
    };

    const handleCancel = async () => {
        window.location.href = '/challenges';
    };

    return (
        <>
        <div>
            <h2 className="text-xl font-bold">View Challenge</h2>
            <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Name" className="p-2 border" readOnly disabled='{true}' value={name} />
                    <input type="text" placeholder="Description" className="p-2 border" readOnly disabled='{true}' value={description} />
                    <input type="text" placeholder="Start date" className="p-2 border" readOnly disabled='{true}' value={start_date} />
                    <input type="text" placeholder="End Date" className="p-2 border"  readOnly disabled='{true}' value={end_date} />
                    <button onClick={handleCancel} className="bg-blue-500 text-white p-2">Back to Challenges</button>
                 { ( isInChallenge ? ''
                  : <button onClick={handleSave} className="bg-blue-500 text-white p-2">Join Challenge</button>  )}
            </div>
            <ul>
                {participants.map((user, index) => (
                    <li key={index}>{index + 1}. {user.name} - {user.points} points</li>
                ))}
            </ul>
        </div>
        {(
            isInChallenge ? <div>
            <h2 className="text-xl font-bold">Progress Logs</h2>
            <input type="text" placeholder="Type" className="p-2 border" onChange={(e) => setType(e.target.value)} />
            <input type="number" placeholder="Duration" className="p-2 border" onChange={(e) => setValue(e.target.value)} />           
            <button onClick={handleProgress} className="bg-blue-500 text-white p-2">Log Progress</button> 
            
            <table>
                <thead>
                    <tr>
                        <td>Activity Type</td>
                        <td>Duration</td>
                        <td>Start Date</td>
                    </tr>
                </thead>
                <tbody>
                {progressLogs.map(log => (
                    <tr key={log._id}>
                        <td>
                            {log.activity_type}
                        </td>
                        <td>
                            {log.value}
                        </td>  
                        <td>
                            {log.createdAt}
                        </td> 
                    </tr>
                ))}
                </tbody>
            </table>
        </div>: ''
        )}
        </>
    );
}

export default ViewChallenge;
