import { useState, useEffect } from 'react';
import {post} from '../../../api';

function CreateChallenge() {
  
    const [leaders, setLeaders] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ challenge_type, setType] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');

    useEffect(() => {
       
    }, []);

    const handleSave = async () => {
        try {
            const res = await post(`challenges`, { name, description, challenge_type, start_date, end_date });                        
        } catch (err) {            
            alert('Failed to create challenge');
        }
    };

    const handleCancel = async () => {
        window.location.href = '/challenges';
    };

    return (
        <div>
            <h2 className="text-xl font-bold">Create Challenge</h2>
            <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Name" className="p-2 border" onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Description" className="p-2 border" onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" placeholder="Type" className="p-2 border" onChange={(e) => setType(e.target.value)} />
                    <input type="Date" placeholder="Start date" className="p-2 border" onChange={(e) => setStartDate(e.target.value)} />
                    <input type="Date" placeholder="End Date" className="p-2 border" onChange={(e) => setEndDate(e.target.value)} />
                    <button onClick={handleCancel} className="bg-blue-500 text-white p-2">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-500 text-white p-2">Save</button>
                </div>
            <ul>
                {leaders.map((user, index) => (
                    <li key={user._id}>{index + 1}. {user.name} - {user.points} points</li>
                ))}
            </ul>
        </div>
    );
}

export default CreateChallenge;
