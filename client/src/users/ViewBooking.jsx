import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../templates/NavBar";
import blob from "../assets/blob.png";
import "../styles/viewbooking.css";
const ViewBooking = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("id");
    axios.post(`http://localhost:3000/user/${id}`).then((response) => {
      console.log(response.data);
      setData(response.data);
    })
  },[]);
  function handleDelete(event,id,f_id) {
    event.preventDefault();
    axios.post(`http://localhost:3000/delbooking/${id}`,{f_id})
  }
  return (
    <div className="main">
      <img src={blob} className="blob-img" />
      <NavBar />
      <div className="my-bookings">
        <div className="booking-title">MY BOOKINGS</div>
        {data.map((flight) => {
          return (
            <div className="details-flight">
              <div className="left-side">
                <p className="booked-details">
                  Flight Number : {flight.flightNumber}
                </p>
                <p className="booked-details">From : {flight.origin}</p>
                <p className="booked-details">To : {flight.depature}</p>
                <p className="booked-details">Date : {flight.date}</p>
                <p className="booked-details">
                  Total tickets :{" "}
                  {flight.bookedcount.firstClassCount +
                    flight.bookedcount.economicClassCount +
                    flight.bookedcount.businessClassCount}
                </p>
              </div>
              <div className="cancel-ticket">
                <span className="cancel-btn" onClick={(e)=>{handleDelete(e,flight._id,flight.flight_id)}}>
                  Cancel Tickets
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBooking;
