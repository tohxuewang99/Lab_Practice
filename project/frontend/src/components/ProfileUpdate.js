import React, { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import Captcha from './Captcha';

function ProfileUpdate() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');

    // const navigate = useNavigate();

    const updateProfile = () => {
        // axios.post('http://127.0.0.1:5000/signup', {
        //     email: email,
        //     password: password
        // })
        //     .then(function (response) {
        //         console.log(response);
        //         navigate("/"); //default path dedicated for login page
        //     })
        //     .catch(function (error) {
        //         console.log(error, 'error');
        //         if (error.response.status === 401) {
        //             alert("Invalid credentials");
        //         }
        //     });
        
    };

    return (
        <div>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-start align-items-center h-100">
                        <p className="display-6 col-md-8 col-lg-6 col-xl-4 offset-xl-1">Profile Update</p>
                        <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1">
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example1">Username</label>
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="form3Example1" className="form-control form-control-lg" placeholder="Enter your username" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example2">Email address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example2" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example3">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter password" />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example1">Address</label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter your full address" />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example5">Phone Number</label>
                                    <input type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} id="form3Example5" className="form-control form-control-lg" placeholder="Enter your phone number" />
                                </div>

                                <div className="App">
                                    <Captcha />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg w-100" onClick={updateProfile} >Update</button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileUpdate;