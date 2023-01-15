import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, signupThunk } from "../../redux/action/auth";



const Auth = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [Signup, setSignup] = useState(false);
  const [passMatch, setpassMatch] = useState(true);
  const [authData, setauthData] = useState({
    username: "",
    password: "",
    confirmpass: "",
    firstname: "",
    lastname: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Signup) {
      authData.password === authData.confirmpass
        ? dispatch(signupThunk(authData))
        : setpassMatch(false);
    } else {
      dispatch(loginThunk(authData));
    }
  };

  const resetForm = () => {
    setauthData({
      username: "",
      password: "",
      confirmpass: "",
      firstname: "",
      lastname: "",
    });
    setpassMatch(true);
  };

  const handleChange = (e) => {
    setauthData({ ...authData, [e.target.name]: e.target.value });
  };
  return (
    <div className="Auth">
      <div className="authLeft">
        <img src={Logo} alt="" />
        <div className="comapnyname">
          <h1>Connector.io</h1>
          <h6>Connect with people around the world which matches your vibe!</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{Signup ? "Sign up" : "Log in"}</h3>
          {Signup && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={authData.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={authData.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="@username"
              onChange={handleChange}
              value={authData.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={authData.password}
            />
            {Signup && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={authData.confirmpass}
              />
            )}
          </div>
          {Signup && (
            <span
              style={{
                display: passMatch ? "none" : "block",
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "7px",
              }}
            >
              Confirm password is not same as password!
            </span>
          )}

          <div className="authText">
            <span
              onClick={() => {
                {
                  setSignup((prev) => !prev);
                }
                resetForm();
              }}
              style={{ fontSize: "12px" }}
            >
              {Signup
                ? "Already have an account. Login!"
                : "Don't have an account. Sign up!"}
            </span>
          </div>
          <button className="button infoButton" type="submit" style={{disabled: authState.isLoading? true:false}}>
            {Signup ? "Signup" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
