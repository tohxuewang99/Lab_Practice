import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a password reset link to the user's email address.
    // You can implement this part according to your backend logic.
    console.log(`Password reset requested for email: ${email}`);
  };

  return (
    <div className="container h-100">
    <div className="container-fluid h-custom">
      <div className="row d-flex justify-content-start align-items-center h-100">
        <p className="display-6 col-md-8 col-lg-6 col-xl-4 offset-xl-1">Forgot Password</p>
        <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1">
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example3">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="form3Example3"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
              />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <p className="small fw-bold mt-2 pt-1 mb-0">Remember your password? <a href="/" className="link-danger">Login</a></p>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit" className="btn btn-primary btn-lg w-100">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}


export default ForgotPassword;
