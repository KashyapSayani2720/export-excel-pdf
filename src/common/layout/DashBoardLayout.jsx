import React from "react";
import Navbar from "../../components/dashbaord/Navbar";
import Sidebar from "../../components/dashbaord/Sidebar";
import { Outlet } from "react-router-dom";

const DashBoardLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="dashboard-content-box">
        <div>
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
