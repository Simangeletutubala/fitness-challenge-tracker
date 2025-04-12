import { useState } from 'react';
import {post} from '../../../api';

function CreateChallenge() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ challenge_type, setType] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');

    const handleSave = async () => {
        try {
          await post(`challenges`, { name, description, challenge_type, start_date, end_date });                        
        } catch (err) {            
            alert('Failed to create challenge');
        }
    };

    const handleCancel = async () => {
        window.location.href = '/challenges';
    };

    return (
        <div className="container card mt-3 text-left">
            
            <div className=" card-body flex flex-col gap-4">
            <h2 className="card-title">Create Challenge</h2>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Name"  className="form-control" onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Description" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Type</label>
                    <input type="text" placeholder="Type" className="form-control" onChange={(e) => setType(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Start date</label>
                    <input type="Date" placeholder="Start date" className="form-control" onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>End Date</label>
                    <input type="Date" placeholder="End Date" className="form-control" onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button onClick={handleCancel} className="btn btn-danger m-2">Cancel</button>
                <button onClick={handleSave} className="btn btn-primary m-2">Save</button>
               
            </div>
        </div>
    );
}

export default CreateChallenge;
