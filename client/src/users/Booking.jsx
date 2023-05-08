import "../styles/booking.css";
import { useState } from "react";
import NavBar from "../templates/NavBar";
import blob from "../assets/blob.png";
import airplane from "../assets/airplane.png";
import DateTimePicker from "react-datetime-picker";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Booking = () => {
  const [fromValue, setfromValue] = useState("");
  const [toValue, settoValue] = useState("");
  const [fromSuggestions, setfromSuggestions] = useState([]);
  const [toSuggestions, settoSuggestions] = useState([]);
  const [departure, setDepature] = useState(new Date());
  const [arrival, setArrival] = useState(new Date());
  const [flightdata, setflightdata] = useState([]);
  const [economyticket, seteconomyticket] = useState(0);
  const [businessticket, setbusinessticket] = useState(0);
  const [firstticket, setfirstticket] = useState(0);

  function handlefromChange(event) {
    const value = event.target.value;
    setfromValue(value);
    if (value === "") setfromSuggestions([]);
    else {
      generatefromSuggestions(value).then((suggestions) => {
        console.log(suggestions);
        setfromSuggestions(suggestions);
      });
    }
  }

  function handletoChange(event) {
    const value = event.target.value;
    settoValue(value);
    if (value === "") settoSuggestions([]);
    else {
      generatetoSuggestions(value).then((suggestions) => {
        settoSuggestions(suggestions);
      });
    }
  }

  function generatefromSuggestions(value) {
    if (value === "") return [];
    return axios
      .post("http://localhost:3000/fromsuggestions", { value })
      .then((response) => {
        return response.data.map((item) => item.origin);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function generatetoSuggestions(value) {
    if (value === "") return [];
    return axios
      .post("http://localhost:3000/tosuggestions", { value })
      .then((response) => {
        console.log(response.data);
        return response.data.map((item) => item.destination);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSuggestionClick1(suggestion) {
    setfromValue(suggestion);
    setfromSuggestions([]);
  }

  function handleSuggestionClick2(suggestion) {
    settoValue(suggestion);
    settoSuggestions([]);
  }

  function handleflightsubmit(event) {
    event.preventDefault();
    if (departure > arrival || departure === arrival) {
      console.log("hi");
      toast.error("First date should be less the second date", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      axios
        .post("http://localhost:3000/search", {
          fromValue,
          toValue,
          departure,
          arrival,
        })
        .then((response) => {
          setflightdata(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleeconomychange(event) {
    event.preventDefault();
    seteconomyticket(event.target.value);
  }

  function handlefirstchange(event) {
    event.preventDefault();
    setfirstticket(event.target.value);
  }
  function handlebusinesschange(event) {
    event.preventDefault();
    setbusinessticket(event.target.value);
  }

  function handlebookticket(event, id, ecount, bcount, fcount) {
    event.preventDefault();
    const u_id = localStorage.getItem("id");

    if (
      economyticket > ecount ||
      firstticket > fcount ||
      businessticket > bcount
    ) {
      toast.error("Don't enter beyond the available seats!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      toast.success("Tickets booked successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
      axios.post(`http://localhost:3000/flight/${id}`, {
        u_id,
        economyticket,
        firstticket,
        businessticket,
      });
      setfromValue("");
      settoValue("");
      setfirstticket(0);
      setbusinessticket(0);
      seteconomyticket(0);
    }
  }
  return (
    <div className="main-wrapper">
      <ToastContainer />
      <img src={blob} className="blob-img" />
      <NavBar />
      <div className="search-wrapper">
        <p className="search-wrapper-title">
          BOOK DOMESTIC AND INTERNATIONAL FLIGHT TICKETS
        </p>
        <div className="form-wrapper">
          <form>
            <div className="search-container">
              <div>
                <input
                  type="text"
                  value={fromValue}
                  onChange={handlefromChange}
                  className="place-search"
                  placeholder="From"
                />
                <ul className="suggestions">
                  {fromSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick1(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <input
                  type="text"
                  value={toValue}
                  onChange={handletoChange}
                  className="place-search"
                  placeholder="To"
                />
                <ul className="suggestions">
                  {toSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick2(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <DateTimePicker
                  onChange={(date) => setDepature(date)}
                  className="place-search"
                  value={departure}
                />
              </div>

              <div>
                <DateTimePicker
                  onChange={(date) => setArrival(date)}
                  className="place-search"
                  value={arrival}
                />
              </div>
            </div>
            <div className="search-flight-btn">
              <span className="flight-btn" onClick={handleflightsubmit}>
                Search Flights
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="display-wrapper">
        {flightdata.map((flight) => {
          return (
            <div className="flights-container">
              <div className="flight-details">
                <img src={airplane} alt="logo" className="login-logo" />
                <h1 className="flight-number">{flight.flightNumber}</h1>
              </div>
              <div className="flight-data">
                <div className="left-details">
                  <p className="left-data">From : {flight.origin}</p>
                  <p className="left-data">To : {flight.destination}</p>
                  <p className="left-data">
                    Departure time : {flight.departureDate}
                  </p>
                  <p className="left-data">
                    Duration(in hrs) : {flight.duration}
                  </p>
                </div>
                <div className="right-details">
                  <p className="right-data">
                    Economy class cost : {flight.cost.economy}
                  </p>
                  <p className="right-data">
                    Economy class seats left : {flight.economyclassCount}
                  </p>
                  <p className="right-data">
                    Business class cost : {flight.cost.business}
                  </p>
                  <p className="right-data">
                    Business class seats left : {flight.businessclassCount}
                  </p>
                  <p className="right-data">
                    First class cost : {flight.cost.firstClass}
                  </p>
                  <p className="right-data">
                    First class seats left : {flight.firstclassCount}
                  </p>
                </div>
              </div>
              <div className="book-tickets">
                Economy class count :
                <input
                  type="number"
                  min="0"
                  max={flight.economyclassCount}
                  onChange={handleeconomychange}
                  value={economyticket}
                ></input>
                Business Class Count:
                <input
                  type="number"
                  min="0"
                  max={flight.businessclassCount}
                  onChange={handlebusinesschange}
                  value={businessticket}
                  placeholder="Economic class count"
                ></input><br/>
                First Class Count :
                <input
                  type="number"
                  min="0"
                  max={flight.firstclassCount}
                  onChange={handlefirstchange}
                  value={firstticket}
                ></input>
                <p>
                  Total :{" "}
                  {economyticket * flight.cost.economy +
                    businessticket * flight.cost.business +
                    firstticket * flight.cost.firstClass}
                </p>
              </div>
              {/* book ticket*/}
              <div className="book-flight-btn">
                <span
                  className="flight-btn"
                  onClick={(event) =>
                    handlebookticket(
                      event,
                      flight._id,
                      flight.economyclassCount,
                      flight.businessclassCount,
                      flight.firstclassCount
                    )
                  }
                >
                  Book tickets
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Booking;
