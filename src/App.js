import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Route, Routes } from "react-router-dom";
import CheckAccuracy from "./components/CheckAccuracy.jsx";
import Root from "./components/Root.jsx";
import Dashboard from "./components/dashbaord/Dashboard.jsx";
import SalesReport from "./components/dashbaord/SalesReport";
import DaybookReport from "./components/dashbaord/DaybookReport";
import DashBoardLayout from "./common/layout/DashBoardLayout.jsx";
import ShopProfile from "./components/dashbaord/ShopProfile.jsx";
import ResetPassword from "./components/Pages/Auth/ResetPassword.jsx";
import Login from "./components/Pages/Auth/Login.jsx";
import ForgotPassword from "./components/Pages/Auth/ForgotPassword.jsx";
import Register from "./components/Pages/Auth/Register.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="daybook-report" element={<DaybookReport />} />
          <Route path="shop-profile" element={<ShopProfile />} />
        </Route>
        <Route path="/check-accuracy" element={<CheckAccuracy />} />
      </Routes>
    </>
  );
}

export default App;
