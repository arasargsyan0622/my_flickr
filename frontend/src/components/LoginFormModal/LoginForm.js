import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoUser = (e) => {
    e.preventDefault();
    const credential = "Demo-lition"
    const password = "password"
    return dispatch(sessionActions.login({ credential, password }))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form-container">
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>{error}</li>
          ))}
        </ul>
        <h1 className="login-header">Welcome back</h1>
        <input
            type="text"
            value={credential}
            className="login-form-input"
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
        />
        <input
            type="password"
            value={password}
            className="login-password-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit" className="login-button">Log In</button>
        <button onClick={demoUser} className="demo-btn" type="submit">Demo User</button>
      </form>


    </>
  );
}

export default LoginForm;
