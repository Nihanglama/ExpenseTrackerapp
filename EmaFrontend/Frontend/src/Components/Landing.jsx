import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/Styles/Landing.css";
import logo from "../assets/Images/logo.png";
import image from "../assets/Images/photo.png";




export default function Landing() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");

  const isUserLoggedIn = !!localStorage.getItem('token');
  if (isUserLoggedIn) {
    window.location.href = "/dashboard"
    return null    
  }
    async function handleLogin(e){
      e.preventDefault();
     
      try{

      const response = await axios.post("http://127.0.0.1:8000/api/login",{
        username: username,
        password: password
      },{
        headers: {
          "Content-Type":"application/json"
        },
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("name",response.data.user.username);

      window.location.href = "/dashboard"
      } catch (error) {
        console.log(error)
        if (error.response){
          setError("user"+error.response.data.detail+"Please enter valid details")
        }else if (error.request){
          console.log("request not responsed by server")
        }else{
          console.log(error)
        }
    }
    
    }

  
  return (
    <div className="main-landing-container globalFonts">
      <div className="left-landing-container">
        <div className="logo-section">
          <img src={logo} alt="logo" />
        </div>
        <div className="content-landing">
          <img src={image} alt="landing" />
        </div>
        <div className="des-landing-container">
          <h3 style={{ color: "#101D54" }}>
            Streamline your finances with Our
          </h3>
          <h3 style={{ color: "#5A9DD4" }}>Cash Management App</h3>
        </div>
      </div>

      <div className="right-landing-container">
        <div className="login-form-container">
          <form className="login-form" >
            <h2>Log In/Create Account</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" onClick={(event)=>handleLogin(event)}>
              Login
            </button>
          </form>
          <Link to="/register" className="create-account-link">
            Create New Account
          </Link>
          {error && <p id="uploading">{error}</p>}
        </div>
      </div>
    </div>
  );
}
