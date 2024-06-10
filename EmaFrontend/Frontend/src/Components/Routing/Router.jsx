import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../Landing";
import Register from "../Register";
import Userdash from "../Dashboard/Userdash";
import Homepage from "../Homepage";
import Deposit from "../Cash/Deposit";
import Logout from "../Logout";
// import Depositwithdraw from "../Depowithdrawform";

function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Landing />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Userdash />}></Route>
          <Route path="/deposit" element={<Deposit />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;
