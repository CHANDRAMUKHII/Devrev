import "../styles/userlogin.css";
import logo from "../assets/logo.png";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminLogin = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    let flag;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(password);
    await axios
      .post("http://localhost:3000/userlogin", { email, password })
      .then((res) => {
        if (res.data === false) {
          flag = false;
          toast.error("Incorrect email or password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
        } else {
          flag = true;
          
        }
      })
      .catch((error) => console.log(error));
    if (flag === true) navigate("/admindashboard");
  }

  return (
    <div className="bg-wrapper">
      <div className="form-container">
        <form onSubmit={submitHandler} className="form" id="form">
          
          <div className="logo-container">
            <img src={logo} alt="logo" className="login-logo" />
            <h1 className="logo-title">FLYNOW</h1>
          </div>
          <h1 className="login-title">Welcome, admin</h1>
          <div className="input-field-container">
            <input
              type="email"
              id="email"
              className="form-input-field"
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>
          <div className="input-field-container">
            <input
              type="password"
              id="password"
              className="form-input-field"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>
          <div className="input-field-container">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
