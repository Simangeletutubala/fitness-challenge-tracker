import { useState, useEffect } from 'react';
import {put, get} from '../../api';
import "./Profile.css";
import { jwtDecode} from "jwt-decode";
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
function Profile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [imgSrc, setSource] = useState('');
    const [imgString, setImage] = useState('');


    useEffect( () => {       
            get(`getUserProfile`).then(res => {
               
                    if (res) {
                        setName(res?.name);  
                        setEmail(res?.email);                        
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
            const token =  localStorage.getItem('authToken');
            const userId = jwtDecode(token).userId;          
            await put(`users`,userId, { name, email, password}).then(res =>{ if(imgString)  {
                const formData = new FormData();
                formData.append('file' , imgString);
                axios.post(`http://localhost:5000/upload/${userId}`, formData, {headers:{
                    'Content-Type': 'multipart/form-data',
                }}).then(res => {}).catch(er => console.log(er));
            }  });  
                              
        } catch (err) {            
            alert('Could not save user profile');
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
