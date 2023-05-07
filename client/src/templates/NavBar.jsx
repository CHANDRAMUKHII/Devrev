import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem("access_token");
    if (isLogged === null) setLoggedIn(false);
    else setLoggedIn(true);

    
  }, []);
  function logoutHandler(event) {
    event.preventDefault();
    localStorage.removeItem("access_token");
    window.location.reload();
  }
function loginHandler(event)
{
    event.preventDefault();
    navigate("/userlogin");
}
  return (
    <nav>
      <div className="logo-container" onclick="redirectToHome()">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="logo-title">FlyNow</h1>
      </div>
      <div className="details">
        <p className="username" id="username">
          Name
        </p>
        <div title="Cart" onclick="redirectToCart()" className="cart-icon">
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

        {isLoggedIn ? (
          <div title="Logout" className="logout-icon" onClick={logoutHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewbox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="nav-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              ></path>
            </svg>
          </div>
        ) : (
          <div title="Login" className="logout-icon" onClick={loginHandler}>
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
