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
    const [value, setValue] = useState(''); 
    const [activity_type, setType] = useState(''); 
    const token =  localStorage.getItem('authToken');
    const userId = jwtDecode(token).userId;
    const [isLoading, setLoading] = useState(true);

    useEffect( () => {       
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
                setLoading(false);
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
                    setType('');
                    setValue('');
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
        {(isLoading ? 
            <div class="spinner-border text-primary spinner" role="status">
                <span class="sr-only">Loading...</span>
            </div> :
            <>
            <div class="container card mt-2 p-1">
            <h2 className="text-xl font-bold">View Challenge</h2>
            <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Name" className="form-control mt-2" readOnly disabled='{true}' value={name} />
                    <input type="text" placeholder="Description" className="form-control mt-2" readOnly disabled='{true}' value={description} />
                    <input type="text" placeholder="Start date" className="form-control mt-2" readOnly disabled='{true}' value={start_date} />
                    <input type="text" placeholder="End Date" className="form-control mt-2"  readOnly disabled='{true}' value={end_date} />
                    <button onClick={handleCancel} className="btn btn-secondary m-2">Back to Challenges</button>
                 { ( isInChallenge ? ''
                  : <button onClick={handleSave} className="btn btn-primary m-2">Join Challenge</button>  )}
            </div>
            
        </div>
        {(participants && participants.length > 0 ? 
            <div className='container card mt-2'>
                <h2 className="text-xl font-bold">Participants</h2>
                <div className='card-body'>
                    <ul className="list-group">
                    {participants.map((user, index) => (
                        <li className="list-group-item" key={index}>{index + 1}. {user.name} - {user.points} points</li>
                    ))}
                    </ul>
                </div>
               
            </div> : ''
        )}
        {(
            isInChallenge ? 
            <div class="container card mt-2">
                <h2 className="text-xl font-bold">Progress Logs</h2>
                <div class="card-body">        
                    <div class="input-group mb-3">
                        <select class="custom-select form-control" id="inputGroupSelect02" value={activity_type} onChange={(e) => setType(e.target.value)}>
                            <option selected>Choose Activity...</option>
                            <option value="Swimming">Swimming</option>
                            <option value="Walking">Walking</option>
                            <option value="Running">Running</option>
                            <option value="Cycling">Cycling</option>
                        </select>    
                    </div>  
                    <input type="number" placeholder="Duration" value={value} className="form-control mt-2" onChange={(e) => setValue(e.target.value)} />           
                    <button onClick={handleProgress}  className="btn btn-primary mt-2">Log Progress</button> 
                    
                    <table class="table"> 
                        <thead>
                            <tr>
                                <th>Activity Type</th>
                                <th>Duration</th>
                                <th>Log Date</th>
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
                                    {new Date(log.createdAt).toLocaleDateString() }
                                </td> 
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>: ''
        )}
            </>
        )}
        

        </>
    );
}

export default ViewChallenge;
