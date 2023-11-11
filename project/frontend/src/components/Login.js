import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";


function Login() {
  const [UserEmailAddress, setEmail] = useState("");
  const [UserPassword, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState(""); // State to store the error message
  const [lockout, setLockout] = useState(false);
  const [recaptchaResponse, setRecaptchaResponse] = useState(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (lockout) {
      setError('Account is locked. Please try again later.');
      return;
    }

    if (UserEmailAddress.length === 0) {
      setError("Email has been left blank!");
      return;
    } else if (UserPassword.length === 0) {
      setError("Password has been left blank!");
      return;
       } else if (!recaptchaResponse) {
      setError("Please complete the reCAPTCHA.");
      return;
       } else if (!recaptchaResponse) {
      setError("Please complete the reCAPTCHA.");
      return;
    } else {
      axios.post('http://127.0.0.1:5000/', {
        UserEmailAddress: UserEmailAddress,
        UserPassword: UserPassword,
        recaptchaResponse: recaptchaResponse,
      })
      .then(function (response) {
        if (response.status === 200) {
          const userRole = response.data.UserRole;
          // Store the user role in sessionStorage 
          sessionStorage.setItem("UserRole", userRole);
          sessionStorage.setItem("isLoggedIn", "true")

          // update the userRole state in component 
          setUserRole(userRole);

          if (userRole === "Buyer"){
            navigate("/home");
          }
          else if(userRole === "Admin" ){
            navigate("/productList");
          }
          else {
            setError("Invalid user role")
          }
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 404) {
            setError(error.response.data.error);

            // Check if the error message indicates an account lockout
            if (error.response.data.error.includes('Account is locked')) {
              // Set the lockout status and provide a user-friendly message
              setLockout(true);
              setError('Account is locked. Please try again later.')
            }
          } 
        }
      });
    }
  }

  const handleRecaptchaChange = (response) => {
    setRecaptchaResponse(response); //capture the reCAPTCHA response
  }

  return (
    <div>
      <div className="container h-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-start align-items-center h-100">
            <p className="display-6 col-md-8 col-lg-6 col-xl-4 offset-xl-1">Welcome Back</p>
            {/* ... other form elements ... */}
            <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">Email address</label>
                  <input type="email" value={UserEmailAddress} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" for="form3Example4">Password</label>
                  <input type="password" value={UserPassword} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                </div>
                <div className="App">
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {/* <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" for="form2Example3">
                      Remember me
                    </label>
                  </div> */}
                </div>
                <ReCAPTCHA sitekey="6Le-Y-8oAAAAAByU8CiZyomBkhuMW8CtUHbPgOHm" onChange={handleRecaptchaChange}/>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                  <button type="button" className="btn btn-primary btn-lg w-100" onClick={handleLogin}>Login</button>
                  {/* Display the error message */}
                  {error && <p className="text-danger">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
