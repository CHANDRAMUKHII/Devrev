import "../styles/admin.css";
import wave from "../assets/blob.png";
import AdminNav from "../templates/AdminNav";
import DateTimePicker from "react-datetime-picker";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const AdminDashboard = () => {
  const airlineRef = useRef();
  const flightRef = useRef();
  const destinationRef = useRef();
  const originRef = useRef();
  const fcRef = useRef();
  const ecRef = useRef();
  const bcRef = useRef();
  const durationRef = useRef();
  const fcostRef = useRef();
  const ecostRef = useRef();
  const bcostRef = useRef();
  const [departure, setDepature] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:3000/flightsfetch").then((response) => {
      setData(response.data);
    });
  });
  function handleAddflight() {
    const airline = airlineRef.current.value;
    const flightNumber = flightRef.current.value;
    const origin = originRef.current.value;
    const destination = destinationRef.current.value;
    const firstclassCount = fcRef.current.value;
    const economyclassCount = ecRef.current.value;
    const businessclassCount = bcRef.current.value;
    const duration = durationRef.current.value;
    const business = bcostRef.current.value;
    const firstClass = fcostRef.current.value;
    const economy = ecostRef.current.value;
    if (airline !== "Domestic" && airline != "International") {
      toast.error("Fill the type of airline", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else if (
      parseInt(firstclassCount) +
        parseInt(economyclassCount) +
        parseInt(businessclassCount) >
      60
    ) {
      toast.error("Total seats are limited to 60", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      axios
        .post("http://localhost:3000/flight", {
          airline,
          flightNumber,
          origin,
          destination,
          departure,
          firstclassCount,
          economyclassCount,
          businessclassCount,
          duration,
          business,
          firstClass,
          economy,
        })
        .then((res) => {
          if (res.data === true) {
            toast.success("Tickets booked successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
            });
          }
        });
    }
  }
  function deleteFlightHandler(event, id) {
    event.preventDefault();
    console.log(id);
    axios.delete(`http://localhost:3000/flight/${id}`).then((res) => {
      if (res.data === true) {
        toast.success("Flight removed successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    });
  }
  return (
    <div className="admin-wrapper">
      <ToastContainer />
      <img src={wave} className="blob-img" />
      <AdminNav />
      <div className="add-dlt-wrapper">
        <div className="add-flight-wrapper">
          <p className="flight-text">Add new Flights</p>
          <div className="add-form">
            <div className="input-field-container">
              <select className="add-input-field" ref={airlineRef}>
                <option key="nill">Type of airline</option>
                <option key="true">Domestic</option>
                <option key="false">International</option>
              </select>
            </div>

            <div className="input-field-container">
              <input
                type="text"
                id="flight-number"
                className="add-input-field"
                placeholder="Flight Number"
                ref={flightRef}
                required
              />
            </div>

            {/* ORIGIN */}
            <div className="input-field-container">
              <input
                type="text"
                id="origin"
                className="add-input-field"
                placeholder="Origin"
                ref={originRef}
                required
              />
            </div>
            {/* DESTINATION */}
            <div className="input-field-container">
              <input
                type="text"
                id="destination"
                className="add-input-field"
                placeholder="Destination"
                ref={destinationRef}
                required
              />
            </div>
            {/* DATE */}
            <div>
              <DateTimePicker
                onChange={(date) => setDepature(date)}
                className="add-input-field"
                value={departure}
              />
            </div>
            {/* FIRST CLASS COUNT */}
            <div className="input-field-container">
              <input
                type="number"
                id="First-class-count"
                className="add-input-field"
                placeholder="First class count"
                ref={fcRef}
                required
              />
            </div>
            {/* ECONOMY CLASS COUNT */}
            <div className="input-field-container">
              <input
                type="number"
                id="Economy-class-count"
                className="add-input-field"
                placeholder="Economy class count"
                ref={ecRef}
                required
              />
            </div>
            {/* BUSINESS CLASS COUNT */}
            <div className="input-field-container">
              <input
                type="number"
                ref={bcRef}
                className="add-input-field"
                placeholder="Business class count"
                required
              />
            </div>
            {/* dURATION */}
            <div className="input-field-container">
              <input
                type="number"
                ref={durationRef}
                className="add-input-field"
                placeholder="Duration"
                required
              />
            </div>
            {/* FIRST CLASS COST */}
            <div className="input-field-container">
              <input
                type="number"
                ref={fcostRef}
                className="add-input-field"
                placeholder="First class cost"
                required
              />
            </div>
            {/* ECONOMY CLASS COST */}
            <div className="input-field-container">
              <input
                type="number"
                ref={ecostRef}
                className="add-input-field"
                placeholder="Economy class cost"
                required
              />
            </div>

            {/* BUSINESS CLASS COUNT */}
            <div className="input-field-container">
              <input
                type="number"
                ref={bcostRef}
                id="address"
                className="add-input-field"
                placeholder="Business class count"
                required
              />
            </div>
            {/* ADD BUTTON */}
            <div className="search-flight-btn" onClick={handleAddflight}>
              <span className="flight-btn">Add flight</span>
            </div>
          </div>
        </div>
        <div className="del-flight-wrapper">
          <p className="flight-text">Remove Flights</p>
          {data.map((flight) => {
            return (
              <div className="details-flight">
                <div className="left-side">
                  <p className="booked-details">
                    Flight Number : {flight.flightNumber}
                  </p>
                  <p className="booked-details">From : {flight.origin}</p>
                  <p className="booked-details">To : {flight.destination}</p>
                  <p className="booked-details">
                    Date :{" "}
                    {new Date(flight.departureDate).toLocaleString("en-US", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                </div>
                <div className="cancel-ticket">
                  <span
                    className="cancel-btn"
                    onClick={(e) => {
                      deleteFlightHandler(e, flight._id);
                    }}
                  >
                    Cancel Flight
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
