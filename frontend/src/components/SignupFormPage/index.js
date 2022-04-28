import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="wrapper">
        <h1 className="signup-header">Sign up if you are lost in space</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="email-container">
        {/* <label> */}
          <input
            placeholder="email"
            className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {/* </label> */}
        </div>
        <div className="username-container">
          {/* <label> */}
            <input
              placeholder="username"
              className="username-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          {/* </label> */}
        </div>
        <div className="password-container">
          {/* <label> */}
            <input
              placeholder="password"
              className="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {/* </label> */}
        </div>
        <div className="confirm-password-container">
          {/* <label> */}
            <input
              placeholder="confirm password"
              className="confirmPass-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          {/* </label> */}
        </div>
        <div className="signup-btns">
          <button type="submit" className="submit-btn">Welcome</button>
          <button type="submit" className="demo-btn">Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
