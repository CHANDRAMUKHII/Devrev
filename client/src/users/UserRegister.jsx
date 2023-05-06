import "../styles/userRegister.css";
import logo from "../assets/logo.png";
const UserRegister = () => {
  return (
    <div className="bg-wrapper">
      <div className="form-container">
        <div className="form-wrapper">
          <form action="" className="form" id="form">
            <div className="msg-container">
              <p className="msg">Error Message</p>
            </div>
            <div className="logo-container">
              <img src={logo} alt="logo" className="login-logo" />
              <h1 className="logo-title">FLYNOW</h1>
            </div>
            <h1 className="login-title">SIGN UP</h1>
            {/* name */}
            <div className="input-field-container">
              <input
                type="text"
                id="name"
                className="form-input-field"
                placeholder="Name"
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
                required
              />
              {/* number */}
              <div className="input-field-container">
                <input
                  type="text"
                  id="contactnumber"
                  className="form-input-field"
                  placeholder="Contact Number"
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
                required
              />
            </div>
            {/* passport */}
            <div className="input-field-container">
              <select className="form-input-field">
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
    </div>
  );
};
export default UserRegister;
