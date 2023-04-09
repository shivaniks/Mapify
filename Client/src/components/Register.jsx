import { Room, Cancel } from '@mui/icons-material'
import axios from 'axios';
import { useState, useRef } from "react";

import "./register.css"
export default function Register({ setShowRegister }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newUser = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      try {
        await axios.post("/users/register", newUser);
        setError(false);
        setSuccess(true);
      } catch (err) {
        setError(true);
      }
    };
    return (
      <div className="registerContainer">
        <div className="logo">
          <Room className="logoIcon" />
          <span>Mapify</span>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <input className="inputField" autoFocus placeholder="username" ref={usernameRef} />
          <input className="inputField" type="email" placeholder="email" ref={emailRef} />
          <input className="inputField"
            type="password"
            min="6"
            placeholder="password"
            ref={passwordRef}
          />
          <br/>
          <button className="registerBtn" type="submit">
            Register
          </button>
          {success && (
            <span className="success">Successfull. You can login now!</span>
          )}
          {error && <span className="failure">Something went wrong!</span>}
        </form>
        <Cancel
          className="registerCancel"
          onClick={() => setShowRegister(false)}
        />
      </div>
    );
  }