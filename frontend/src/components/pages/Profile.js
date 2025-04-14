import { useState, useEffect } from 'react';
import {put, get} from '../../api';
import "./Profile.css";
function Profile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [imgSrc, setSource] = useState('');
    const [imgString, setImage] = useState('');


    useEffect( () => {       
            get(`getUserProfile`).then(res => {
                    if (res?.length > 0) {
                        setName(res.name);  
                        setEmail(res.name); 
                        setPassword(res.name); 

                        var picture = res.profile_picture;

                        if(picture){
                            var src     = URL.createObjectURL(picture);        
                            setSource(src);
                        }        
                                         
                       
                    }
                
            });
    }, []);

    const handleSave = async () => {
        try {
          await put(`users`, { name, email, password, imgString });                        
        } catch (err) {            
            alert('Failed to create challenge');
        }
    };

    const onChange = async (event) => {
        var picture = event.target.files[0];

        if(picture){
            var src     = URL.createObjectURL(picture);        
            setSource(src);
            setImage(picture);
        }        
    }

    return (
        <>
            <div className="container card mt-3 text-left">            
                <div className=" card-body flex flex-col gap-4">
                <h2 className="card-title">User Profile</h2>

                
               
                {(imgSrc ? 
                <div>
                    <label htmlFor="photo-upload" className="custom-file-upload fas">
                        <div className="img-wrap img-upload" >
                            <img htmlFor="photo-upload" alt='profile-picture' className='image' src={imgSrc}/>
                        </div>
                    </label> 
                </div>
                : <></> )} 
                 <div>
                 <input id="photo-upload" type="file" onChange={onChange}/> 
                 </div>
               
                
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder=""  value={name} className="form-control" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" placeholder="" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" placeholder="" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button onClick={handleSave} className="btn btn-primary m-2">Save</button>               
                </div>
            </div>
        
        </>
       
    );
}

export default Profile;
