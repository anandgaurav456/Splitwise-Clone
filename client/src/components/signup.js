import React from "react";
import "../styles/signup.css";
import { withRouter } from "react-router-dom";
import { instance } from "../utils/AxiosConfig";
import Header from "./Header";

// Object to store user data
var obj = {};

const SignUp = (props) => {
  console.log("props = ", props);
  return (
    <div>
      <Header />
      <div className="container signup">
        <div className="signup-logo">
          <img src={require("../images/logo.png")} alt="" />
        </div>

        <div className="signup-form">
          <h3>INTRODUCE YOURSELF</h3>
          <label htmlFor="">Name</label>
          <input
            id="username"
            onChange={(event) => {
              obj[event.target.id] = event.target.value;
            }}
            className="form-control"
            type="text"
            required
          />
          <label htmlFor="">Email Address: </label>
          <input
            id="email"
            onChange={(event) => {
              obj[event.target.id] = event.target.value;
            }}
            className="form-control"
            type="email"
            required
          />
          <label htmlFor="">Password: </label>
          <input
            id="password"
            onChange={(event) => {
              obj[event.target.id] = event.target.value;
              console.log(obj);
            }}
            className="form-control"
            type="password"
            required
          />
          <button
            onClick={() => {
              // console.log(obj);
              // Check if all fields are set properly
              if (
                obj.password === undefined ||
                obj.email === undefined ||
                obj.username === undefined
              ) {
                alert("Form is Incomplete");
              } else {
                var pr = instance.post("/signup", obj);
                pr.then((response) => {
                  // console.log(response.data.Status);
                  if (response.data.Status === "S") {
                    alert("Successful Registerd");
                    props.history.push("/Dashboard");
                  } else if (response.data.Status === "F") {
                    alert("Username or Email Id Already exist");
                  }
                });
              }
            }}
            className="btn"
          >
            Sign me up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
