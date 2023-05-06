import "../styles/booking.css";
import { useState } from "react";
import NavBar from "../templates/NavBar";
import blob from "../assets/blob.png";
import DateTimePicker from "react-datetime-picker";
const Booking = () => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [departure, setDepature] = useState(new Date());
  function handleInputChange1(event) {
    const value = event.target.value;
    setInputValue1(value);
    if (value === "") setSuggestions1([]);
    else setSuggestions1(generateSuggestions(value));
  }

  function handleInputChange2(event) {
    const value = event.target.value;
    setInputValue2(value);
    if (value === "") setSuggestions2([]);
    else setSuggestions2(generateSuggestions(value));
  }

  function generateSuggestions(value) {
    // Implement your suggestion generation logic here
    // ...
    return ["Suggestion 1", "Suggestion 2", "Suggestion 3"];
  }

  function handleSuggestionClick1(suggestion) {
    setInputValue1(suggestion);
    setSuggestions1([]);
  }

  function handleSuggestionClick2(suggestion) {
    setInputValue2(suggestion);
    setSuggestions2([]);
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
                  value={inputValue1}
                  onChange={handleInputChange1}
                  className="place-search"
                  placeholder="From"
                />
                <ul className="suggestions">
                  {suggestions1.map((suggestion, index) => (
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
                  value={inputValue2}
                  onChange={handleInputChange2}
                  className="place-search"
                  placeholder="To"
                />
                <ul className="suggestions">
                  {suggestions2.map((suggestion, index) => (
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
                <DateTimePicker onChange={(date) => setDepature(date)} className="place-search" value={departure} />
                
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
