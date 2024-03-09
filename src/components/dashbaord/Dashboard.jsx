import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';

const Dashboard = () => {
  return (
    <div>
        <div><Navbar/></div>
        <div className='dashboard-content-box'>
            <div><Sidebar/></div>
            <div><Content/></div>
        </div>
    </div>
  )
}

export default Dashboard