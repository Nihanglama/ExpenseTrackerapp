import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/Images/logo.png";
import image from "../assets/Images/photo.png";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [uname, setuname] = useState("");
  const [error,setError]=useState("");  
  const isAuthencated = !!localStorage.getItem("token");

  if (isAuthencated) {
    window.location.href = "/dashboard";
    return null;
  }
  async function handleRegister(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        {
          first_name:fname,
          last_name:lname,
          email: email,
          username: uname,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = "/login";
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } else if (error.request) {
        setError(error.request)
      } else {
        setError(error.message)
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
          <form className="login-form">
            <h2>Create Account</h2>
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>username</label>
              <input
                type="text"
                className="form-control"
                placeholder="username"
                onChange={(e) => setuname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button
                onClick={(event)=>handleRegister(event)}
                className="login-button login-reg-btn"
              >
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/login">Login</a>
            </p>
            
          </form>
          {error && <p id="uploading">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
