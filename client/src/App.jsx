import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booking from "./users/Booking";
import UserLogin from "./users/UserLogin";
import UserRegister from "./users/UserRegister";
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLogin />} path="/userlogin" />
          <Route element={<UserRegister />} path="/useregister" />
          <Route element={<Booking/>} path="/booking" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
