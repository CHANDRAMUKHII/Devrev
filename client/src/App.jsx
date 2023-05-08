import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booking from "./users/Booking";
import UserLogin from "./users/UserLogin";
import UserRegister from "./users/UserRegister";
import ViewBooking from "./users/ViewBooking";
import AdminDashboard from "./admin/AdminDashboard";
import AllBookings from "./admin/AllBookings";
import AdminLogin from "./admin/AdminLogin";
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLogin />} path="/userlogin" />
          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<UserRegister />} path="/useregister" />
          <Route element={<Booking/>} path="/booking" />
          <Route element={<ViewBooking/>} path="/booking/:id"/>
          <Route element={<AdminDashboard/>} path="/admindashboard"/>
          <Route element={<AllBookings/>} path="/allbookings"/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
