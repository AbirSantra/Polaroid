import React, { useState } from "react";
import "./Auth.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseLock, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import jwt_decode from "jwt-decode";

require("dotenv").config();
const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);

    const [showPass, setShowPass] = useState(false);

    const [formData, setformData] = useState(initialState);

    const handleShowPassword = () => {
        setShowPass((prevShowPass) => !prevShowPass);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            //logic for signup
            dispatch(signup(formData, navigate));
        } else {
            //logic for signin
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    };

    const googleSuccess = async (res) => {
        const token = res.credential;
        const data = jwt_decode(token);
        // console.log(data);
        const result = {
            email: data.email,
            familyName: data.family_name,
            username: data.given_name,
            googleId: data.sub,
            imageUrl: data.picture,
            name: data.name,
        };
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = () => {
        console.log("Google Sign in Failed! Try again later.");
    };

    return (
        <div className="auth-container">
            <FontAwesomeIcon
                icon={faHouseLock}
                className="lock-icon"
            ></FontAwesomeIcon>
            <div className="auth-title">
                {isSignUp
                    ? "Welcome to Polaroid! Sign Up."
                    : "Welcome Back! Sign in."}
            </div>
            <form onSubmit={handleSubmit} className="auth-form">
                {isSignUp && (
                    <>
                        <input
                            type="text"
                            className="form-input firstname"
                            placeholder="First Name"
                            name="firstName"
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="form-input lastname"
                            placeholder="Last Name"
                            name="lastName"
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Set Username"
                            name="userName"
                            required
                            onChange={handleChange}
                        />
                    </>
                )}
                <input
                    type="email"
                    className="form-input email"
                    placeholder="Email Address"
                    name="email"
                    required
                    onChange={handleChange}
                />
                <div className="password-container">
                    <input
                        type={showPass ? "text" : "password"}
                        className="form-input password"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon
                        icon={faEye}
                        className={
                            showPass
                                ? "show-password show-password-active"
                                : "show-password"
                        }
                        onClick={handleShowPassword}
                    ></FontAwesomeIcon>
                </div>
                {isSignUp && (
                    <input
                        type="password"
                        className="form-input password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        onChange={handleChange}
                    />
                )}
                <button className="main-btn signin-btn" type="submit">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </button>
                <div className="switch">
                    <button className="switch-btn" onClick={switchMode}>
                        {isSignUp
                            ? "Already got an account? Sign In"
                            : "New here? Create a new account."}
                    </button>
                </div>
                {/* <div className="divider"></div> */}
                <div>or</div>
                <div className="google-login">
                    <GoogleOAuthProvider clientId="519245500733-i9g1u4l11a68rlet59r6o7m8fa0pvvc6.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={googleFailure}
                            theme="outline"
                            size="medium"
                        />
                    </GoogleOAuthProvider>
                </div>
            </form>
        </div>
    );
};

export default Auth;
