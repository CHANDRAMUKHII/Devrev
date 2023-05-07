const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();
const AdminModel = require("./models/adminModel");
const UserModel = require("./models/userModel");
const FlightModel = require("./models/flightModel");
const BookingModel = require("./models/bookingModel");
const app = express();
const jwt = require("jsonwebtoken");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://chandramukhiianbarasu:RNb2wnscXNM4CE6C@flightbooking.dojt722.mongodb.net/flightbooking"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/admin", async (req, res) => {
  const { name, password, email } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const admin = new AdminModel({
    name: name,
    password: hash,
    email: email,
  });
  try {
    admin.save();
    res.send("Admin Registered successfully");
  } catch {
    res.send("error");
  }
});

app.post("/user", async (req, res) => {
  let {
    user_name,
    password,
    email,
    age,
    contact_number,
    address,
    passport,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  if (passport === "Yes") passport = "true";
  else passport = "false";

  const user = new UserModel({
    name: user_name,
    password: hash,
    email: email,
    age: age,
    contact_number: contact_number,
    address: address,
    passport: passport,
  });
  try {
    await user.save();
    res.send(true);
  } catch {
    res.send(false);
  }
});

app.post("/flight", async (req, res) => {
  const {
    airline,
    flightnum,
    origin,
    destination,
    departureDate,
    firstclassCount,
    economyclassCount,
    businessclassCount,
    firstclassocc,
    economyclassocc,
    businessclassocc,
  } = req.body;
  const flight = new FlightModel({
    airline: airline,
    flightNumber: flightnum,
    origin: origin,
    destination: destination,
    departureDate: departureDate,
    firstclassCount: firstclassCount,
    economyclassCount: economyclassCount,
    businessclassCount: businessclassCount,
    firstclassocc: firstclassocc,
    economyclassocc: economyclassocc,
    businessclassocc: businessclassocc,
  });

  try {
    flight.save();
    res.send("Flight saved successfully!!");
  } catch {
    res.send("Error!!");
  }
});
app.delete("/flight/:id", async (req, res) => {
  try {
    const deletedFlight = await FlightModel.findByIdAndDelete(req.params.id);
    if (!deletedFlight) {
      return res.send("Flight not found!!");
    }
    res.send("Flight deleted successfully!!");
  } catch (error) {
    res.send(error);
  }
});

app.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;
  
  const response = await UserModel.find(
    { email: email },
    { password: 1, _id: 0 }
  );
  
  if ((response.length!==0)) {
    bcrypt
      .compare(password, response[0].password)
      .then((resp) => {
        if (resp) {
          const user = { email: email };
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          res.json({ accessToken: accessToken });
        } else res.send(false);
      })
      .catch((error) => console.log(error));
  } else res.send("NE");
});

app.post("/adminlogin", async (req, res) => {
  const { name, password } = req.body;
  const response = await AdminModel.find(
    { name: name },
    { password: 1, _id: 0 }
  );
  bcrypt
    .compare(password, response[0].password)
    .then((resp) => {
      if (resp) {
        res.send("Admin logged in successfully");
      } else res.send(false);
    })
    .catch((error) => console.log(error));
});

// SUGGESTIONS
app.post("/suggestions",async(req,res)=>{
  let { value} = req.body;

  const response = await FlightModel.find({
    origin: { $regex: value, $options: "i" },
  },{origin:1,_id:0});
  
  res.send(response);
})

// SEARCH FOR FLIGHTS BASED ON DATE AND TIME
app.post("/search", async (req, res) => {
  const { startdate, enddate } = req.body;
  const response = await FlightModel.find({
    departureDate: { $gte: startdate, $lte: enddate },
  });
  res.send(response);
});
// BOOK FLIGHTS
app.post("/flight/:id", async (req, res) => {
  const { id } = req.params;
  var {
    firstclassCount,
    businessclassCount,
    economyclassCount,
    u_id,
  } = req.body;

  if (firstclassCount === undefined) firstclassCount = 0;
  if (businessclassCount === undefined) businessclassCount = 0;
  if (economyclassCount === undefined) economyclassCount = 0;
  const bookedcount = firstclassCount + businessclassCount + economyclassCount;
  const updateData = {
    $inc: {
      economyclassCount: economyclassCount * -1,
      firstclassCount: firstclassCount * -1,
      businessclassCount: businessclassCount * -1,
    },
  };
  try {
    const flight = await FlightModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    const user = await UserModel.findById(u_id);

    const booking = new BookingModel({
      user_id: u_id,
      flightNumber: flight.flightNumber,
      passengerName: user.name,
      passengerEmail: user.email,
      passengerPhone: user.contact_number,
      bookedcount: bookedcount,
    });
    booking.save();
    res.send("Booked successfully");
  } catch (error) {
    console.log(error);
  }
});
// MY BOOKINGS
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const response = await BookingModel.find({ user_id: id });
  res.send(JSON.stringify(response));
});

// ALL BOOKINGS ADMIN

app.listen(3000, () => {
  console.log("Listening in port 3000");
});
