import "../styles/booking.css";
import { useState } from "react";
import NavBar from "../templates/NavBar";
import blob from "../assets/blob.png";
import airplane from "../assets/airplane.png";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
const Booking = () => {
  const [fromValue, setfromValue] = useState("");
  const [toValue, settoValue] = useState("");
  const [fromSuggestions, setfromSuggestions] = useState([]);
  const [toSuggestions, settoSuggestions] = useState([]);
  const [departure, setDepature] = useState(new Date());
  const [arrival, setArrival] = useState(new Date());
  const [flightdata, setflightdata] = useState([]);
  function handlefromChange(event) {
    const value = event.target.value;
    setfromValue(value);
    if (value === "") setfromSuggestions([]);
    else {
      generatefromSuggestions(value).then((suggestions) => {
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
    if (departure > arrival || departure === arrival)
      alert("Departure should be lesser than arrival");
    else {
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
  return (
    <div className="main-wrapper">
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
      <div className="wrapper">
        {flightdata.map((flight) => {
          return (
            <div className="flights-container">
          <div className="flight-details">
            <img src={airplane} alt="logo" className="login-logo" />
            <h1 className="flight-number">{flight.flightNumber}</h1>
          </div>
          <div className="flight-details">
            <div></div>
</div>
        </div>
          );
        })}
      </div>
    </div>
  );
};

export default Booking;
