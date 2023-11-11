import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha
} from "react-simple-captcha";

class Captcha extends Component {
    componentDidMount() {
        loadCaptchaEnginge(8);
    }

    doSubmit = () => {
        let user_captcha = document.getElementById("user_captcha_input").value;

        if (validateCaptcha(user_captcha) === true) {
            alert("Captcha Matched");
            loadCaptchaEnginge(6);
            document.getElementById("user_captcha_input").value = "";
        } else {
            alert("Captcha Does Not Match");
            document.getElementById("user_captcha_input").value = "";
        }
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row mt-4 mr-5 ">
                        <div className="col-md-6">
                            <LoadCanvasTemplate />
                        </div>
                        <div className="col-md-6 mt-3">
                            <input
                                placeholder="Enter Captcha"
                                id="user_captcha_input"
                                name="user_captcha_input"
                                type="text"
                            ></input>
                        </div>

                        {/* <div className="col mt-3">
              <div>
                <input
                  placeholder="Enter Captcha"
                  id="user_captcha_input"
                  name="user_captcha_input"
                  type="text"
                ></input>
              </div>
            </div> */}
                        {/* 
            <div className="col mt-3">
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => this.doSubmit()}
                >
                  Submit
                </button>
              </div>
            </div> */}
                    </div>
                </div>
            </div>
        );
    }
}


export default Captcha;