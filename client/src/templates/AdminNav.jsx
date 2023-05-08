import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

const AdminNav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    const isLogged = localStorage.getItem("access_token");
    if (isLogged === null) setLoggedIn(false);
    else {
      setLoggedIn(true);
      setName(localStorage.getItem("name"));
    }
  });
 

  function redirectToBooking(event) {
    event.preventDefault();
    
    navigate("/allbookings");
  }
  function redirectToHome(event) {
    event.preventDefault();
    navigate("/admindashboard");
  }
  return (
    <nav>
      <div className="logo-container" onClick={redirectToHome}>
        <img src={logo} className="logo" alt="logo" />
        <h1 className="logo-title">FlyNow</h1>
      </div>
      <div className="details">
        
        <div
          title="All Bookings"
          onClick={redirectToBooking}
          className="cart-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="nav-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </div>

        
      </div>
    </nav>
  );
};

export default AdminNav;
