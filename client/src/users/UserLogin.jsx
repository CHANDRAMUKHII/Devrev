import "../styles/userlogin.css";
import logo from "../assets/logo.png";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserLogin = () => {
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
        } else if (res.data === "NE") {
          flag = false;
          toast.error("Unregistered user", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
        } else {
          flag = true;
          localStorage.setItem("access_token", res.data.accessToken);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("id", res.data.id);
        }
      })
      .catch((error) => console.log(error));
    if (flag === true) navigate("/booking");
  }

  return (
    <div className="bg-wrapper">
      <div className="form-container">
        <form onSubmit={submitHandler} className="form" id="form">
          <div className="msg-container">
            <p className="msg">Error Message</p>
          </div>
          <div className="logo-container">
            <img src={logo} alt="logo" className="login-logo" />
            <h1 className="logo-title">FLYNOW</h1>
          </div>
          <h1 className="login-title">Log in</h1>
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
          <div>
            <p className="form-link">
              Create New Account ?
              <a href="./useregister" className="form-link">
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserLogin;
