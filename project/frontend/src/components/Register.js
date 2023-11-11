import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
    const changeCaptcha = () => {};
    const [Username, setUsername] = useState('');
    const [UserPassword, setPassword] = useState('');
    const [UserAddress, setAddress] = useState('');
    const [UserPhoneNumber, setPhoneNum] = useState('');
    const [UserEmailAddress, setEmail] = useState('');


    const navigate = useNavigate();

    const registerUser = () => {
        // Prepare the user registration data
        const userData = {
            Username: Username,
            UserPassword: UserPassword,
            UserAddress: UserAddress,
            UserPhoneNumber: UserPhoneNumber,
            UserEmailAddress: UserEmailAddress,
        };

       // Send a POST request to the Flask server's /register route
        axios.post('http://127.0.0.1:5000/register', userData)
        .then(function (response) {
            console.log(response);
            // Handle a successful registration (you can navigate to another page)
            navigate("/"); // Default path dedicated for the login page
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response && error.response.status === 409) {
                alert("Email already exists");
                return("Email already exists");
            }
            // Handle registration errors
        });//default path dedicated for login page
    };

    return (
        <div>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-start align-items-center h-100">
                        <p className="display-6 col-md-8 col-lg-6 col-xl-4 offset-xl-1">Register Now</p>
                        <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1">
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example1">Username</label>
                                    <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} id="form3Example1" className="form-control form-control-lg" placeholder="Enter your username" required/>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example2">Email address</label>
                                    <input type="email" value={UserEmailAddress} onChange={(e) => setEmail(e.target.value)} id="form3Example2" className="form-control form-control-lg" placeholder="Enter a valid email address" required/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example3">Password</label>
                                    <input type="password" value={UserPassword} onChange={(e) => setPassword(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter password" required/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example1">Address</label>
                                    <input type="text" value={UserAddress} onChange={(e) => setAddress(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter your full address" required/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example5">Phone Number</label>
                                    <input type="text" value={UserPhoneNumber} onChange={(e) => setPhoneNum(e.target.value)} id="form3Example5" className="form-control form-control-lg" placeholder="Enter your phone number" required/>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div> */}



                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <ReCAPTCHA sitekey="6Le-Y-8oAAAAAByU8CiZyomBkhuMW8CtUHbPgOHm" onChange={changeCaptcha}/>
                                    <button type="button" className="btn btn-primary btn-lg w-100" onClick={registerUser} >Sign Up</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Login to your account <a href="/" className="link-danger">Login</a></p>



                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register;