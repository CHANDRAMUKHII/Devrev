import "../styles/userRegister.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
const UserRegister = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const ageRef = useRef();
  const passportRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();
let flag = true;
  async function submitHandler(event) {
    event.preventDefault();
    
    const user_name = nameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    const age = ageRef.current.value;
    const contact_number = numberRef.current.value;
    const address = addressRef.current.value;
    const passport = passportRef.current.value;
    axios
      .post("http://localhost:3000/user", {
        user_name,
        password,
        email,
        age,
        contact_number,
        address,
        passport,
      })
      .then((res) => {
        if (res.data === false) {
          flag = false;
          alert("User Already exists!");
        }
        

        localStorage.setItem("access_token", res.data.accessToken);
      })
      .catch((error) => console.log(error));
    if (flag === true) navigate("/booking");
  }
  return (
    <div className="bg-wrapper">
      <div className="form-container">
        <form onSubmit={submitHandler} className="form" id="form">
          <div className="logo-container">
            <img src={logo} alt="logo" className="login-logo" />
            <h1 className="logo-title">FLYNOW</h1>
          </div>
          <h1 className="login-title">SIGN UP</h1>
          {/* name */}
          <div className="input-field-container">
            <input
              type="text"
              id="user_name"
              className="form-input-field"
              placeholder="Name"
              ref={nameRef}
              required
            />
          </div>
          {/* email */}
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
          {/* age */}
          <div className="input-field-container">
            <input
              type="number"
              min="18"
              id="age"
              className="form-input-field"
              placeholder="Age"
              ref={ageRef}
              required
            />
            {/* number */}
            <div className="input-field-container">
              <input
                type="text"
                id="contactnumber"
                className="form-input-field"
                placeholder="Contact Number"
                ref={numberRef}
                required
              />
            </div>
          </div>
          {/* address */}
          <div className="input-field-container">
            <input
              type="text"
              id="address"
              className="form-input-field"
              placeholder="Country"
              ref={addressRef}
              required
            />
          </div>
          {/* passport */}
          <div className="input-field-container">
            <select className="form-input-field" ref={passportRef}>
              <option key="nill">Have passport ? </option>
              <option key="true">Yes</option>
              <option key="false">No</option>
            </select>
          </div>
          {/* password */}
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
export default UserRegister;
