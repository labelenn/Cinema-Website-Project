import '../App.css';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../data/GraphQLRepo';
import { useNavigate } from 'react-router-dom';

function Dashboard(props) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Get all users from database
    useEffect(() => {
        async function fetchData() {
            const users = await getUsers();
            setUsers(users.all_users);
        }
        fetchData();
    }, []);

    console.log(users);

    // Handle manage button click, redirect to manage page
    const handleManage = (e, feature, users) => {
        e.preventDefault();

        const data = {
            users: users,
            feature: feature
        }

        navigate('/manage', {state: data});
    }
  
    return (
        <div className = "admin-dashboard-column">
            <div className="admin-dashboard-users">
                <div className = "dashboard-column-content">
                    <h2 id = "dashboard-column-heading">Users</h2>
                    {users.map((user) => (
                        <ul>
                            <li key={user.email}>
                                <p>First Name: {user.firstname}</p>
                                <p>Last Name: {user.lastname}</p>
                                <p>Email: {user.email}</p>
                            </li>
                        </ul>
                    ))}    
                </div>
            </div>
            <div className = "dashboard-manage-button">
                <input onClick = {(e) => handleManage(e, 1, users)} type = "admin-manage" className = "btn btn-primary" value = "manage" readOnly/> 
            </div>
        </div>
    );
}
export default Dashboard;