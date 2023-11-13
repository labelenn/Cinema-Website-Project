import '../App.css';
import React, { useEffect, useState } from 'react';
import DashboardUsers from './DashboardUsers';
import DashboardMovies from './DashboardMovies';
import DashboardReviews from './DashboardReviews';

function Dashboard(props) {
  
    return (
        <div className = "dashboard-wrapper" id = "admin-dashboard">
            <DashboardUsers />
            <DashboardReviews />
            <DashboardMovies />   
        </div> 
    );
}
export default Dashboard;