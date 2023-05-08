import AdminNav from "../templates/AdminNav";
import wave from "../assets/blob.png";
import "../styles/allbookings.css";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

const AllBookings = () => {
  const [flightNumber, setflightNumber] = useState("");
  const [data, setData] = useState([]);
  const [departure, setDepature] = useState(new Date());
  const [fromSuggestions, setfromSuggestions] = useState([]);

  function handlefromChange(event) {
    const value = event.target.value;
    setflightNumber(value);
    if (value === "") setfromSuggestions([]);
    else {
      generatefromSuggestions(value).then((suggestions) => {
        console.log(suggestions);
        setfromSuggestions(suggestions);
      });
    }
  }
  function generatefromSuggestions(value) {
    if (value === "") return [];
    return axios
      .post("http://localhost:3000/flightnumber", { value })
      .then((response) => {
        return response.data.map((item) => item.flightNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSuggestionClick1(suggestion) {
    setflightNumber(suggestion);
    setfromSuggestions([]);
  }

  function handlesubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:3000/allbooking",{flightNumber,departure}).then((res)=>{setData(res.data)})

  }
  return (
    <div className="allbookings-wrapper">
      <img src={wave} className="blob-img" />
      <AdminNav />
      <div className="search-bookings">
        <div className="search-box">
          <div>
            <input
              type="text"
              value={flightNumber}
              onChange={handlefromChange}
              className="place-search"
              placeholder="Flight number"
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
            <DatePicker
              selected={departure}
              onChange={(date) => setDepature(date)}
              className="place-search"
            />
          </div>
          <div>
            <span className="flight-btn" onClick={handlesubmit}>
              Search Booking
            </span>
          </div>
        </div>
        <div className="search-results">
        {data.map((flight) => {
            return (
              <div className="details-flight">
                <div className="left-side">
                  <p className="booked-details">
                    Flight Number : {flight.flightNumber}
                  </p>
                  <p className="booked-details">From : {flight.origin}</p>
                  <p className="booked-details">To : {flight.depature}</p>
                  <p className="booked-details">User : {flight.passengerName}</p>
                  <p className="booked-details">User Email: {flight.passengerEmail}</p>
                  <p className="booked-details">Total tickets :{" "}
                  {flight.bookedcount.firstClassCount +
                    flight.bookedcount.economicClassCount +
                    flight.bookedcount.businessClassCount}</p>
                  <p className="booked-details">
                    Date : {new Date(flight.date).toLocaleString("en-US", {timeZone: "Asia/Kolkata"})}
                  </p>
                </div>
                
              </div>
            );
          })}

</div>
      </div>
    </div>
  );
};

export default AllBookings;
