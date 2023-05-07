import "../styles/booking.css";
import { useState } from "react";
import NavBar from "../templates/NavBar";
import blob from "../assets/blob.png";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
const Booking = () => {
  const [fromValue, setfromValue] = useState("");
  const [toValue, settoValue] = useState("");
  const [fromSuggestions, setfromSuggestions] = useState([]);
  const [toSuggestions, settoSuggestions] = useState([]);
  const [departure, setDepature] = useState(new Date());
  function handleInputChange1(event) {
    const value = event.target.value;
    setfromValue(value);
    if (value === "") setfromSuggestions([]);
    
      else {
      generateSuggestions(value).then((suggestions) => {
        setfromSuggestions(suggestions);
      });
    }
  }

  function handleInputChange2(event) {
    const value = event.target.value;
    settoValue(value);
    if (value === "") settoSuggestions([]);
    else {
      generateSuggestions(value).then((suggestions) => {
        settoSuggestions(suggestions);
      });
    }
  }

   function generateSuggestions(value) {
    if(value==="")return [];
    return  axios
      .post("http://localhost:3000/suggestions", { value })
      .then((response) => {
        return response.data.map((item) => item.origin);
      })
      .catch((error) => {
        console.log(error);
      });

    // return ["Suggestion 1", "Suggestion 2", "Suggestion 3"];
  }

  function handleSuggestionClick1(suggestion) {
    setfromValue(suggestion);
    setfromSuggestions([]);
  }

  function handleSuggestionClick2(suggestion) {
    settoValue(suggestion);
    settoSuggestions([]);
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
                  onChange={handleInputChange1}
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
                  onChange={handleInputChange2}
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
            </div>
            <div className="search-flight-btn">
              <span className="flight-btn">Search Flights</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
