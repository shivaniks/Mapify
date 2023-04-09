import {Room,Cancel} from '@mui/icons-material'
import axios from 'axios';
import {useState,useRef} from "react";

import "./login.css"
export default function Login({ setShowLogin, setCurrentUser,myStorage }) {
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const user = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      try {
        const res = await axios.post("/users/login", user);
        setCurrentUser(res.data.username);
        myStorage.setItem('user', res.data.username);
        setShowLogin(false)
      } catch (err) {
        setError(true);
      }
    };

    return (
      <div className="loginContainer">
        <div className="logo">
          <Room className="logoIcon" />
          <span>Mapify</span>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <input className="inputField" autoFocus placeholder="username" ref={usernameRef} />
          <input className="inputField"
            type="password"
            min="6"
            placeholder="password"
            ref={passwordRef}
          />
          <br/>
          <button className="loginBtn" type="submit">
            Login
          </button>
          {error && <span className="failure">Something went wrong!</span>}
        </form>
        <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
      </div>
    );
  }