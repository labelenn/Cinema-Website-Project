import './App.css';
import React, { useEffect, useState, } from 'react';
// import { initUsers, getUserFirstName, getUserLastName, getJoinDate, getUserPassword, removeUser, initReviews } from './data/Data';
import Header from './fragments/Header';
import Navbar from  './fragments/Navbar';
import Footer from './fragments/Footer';
import Home from './pages/Home';
import Dashboard from './admin/Dashboard';
import Manage from './admin/Manage';
import DashboardUsers from './admin/DashboardUsers';
import DashboardMovies from './admin/DashboardMovies';
import DashboardReviews from './admin/DashboardReviews';
import ManageMovie from './admin/ManageMovie';
import MovieInfo from './pages/MoviesPages/MovieInfo';
import Reservation from './pages/MoviesPages/Reservation';
import ReservationsMade from './pages/MoviesPages/ReservationsMade';
import Profile from './pages/Profile';
import Reviews from './pages/ReviewsPages/Reviews';
import EditReview from './pages/ReviewsPages/EditReview';
import DeleteReview from './pages/ReviewsPages/DeleteReview';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';
import UsersDataService from './services/UsersService';

// // Initialize data local storage
// initUsers();
// initReviews();

export const Context = React.createContext();

function App() {
  const [userFN, setUserFN] = useState(null);
  const [userLN, setUserLN] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [adminBlocked, setAdminBlocked] = useState(null);
  const [userJoinedDate, setUserJoinedDate] = useState(null);
  const [userUpdatedDate, setUserUpdatedDate] = useState(null);
  const [adminPage, setAdminPage] = useState(false);

  useEffect(() => {
    // Get Data
    async function fetchData() {
      const response = await UsersDataService.loggedInUser();
      if (response.data.length !== 0) {
        setUserFN(response.data[0].firstname);
        setUserLN(response.data[0].lastname);
        setUserEmail(response.data[0].email);
        setUserPassword(response.data[0].password);
        setUserLoggedIn(response.data[0].loggedIn);
        setUserJoinedDate(response.data[0].createdAt);
        setUserUpdatedDate(response.data[0].updatedAt);
        setAdminBlocked(response.data[0].adminBlocked);
      }
    }
    fetchData();
  }, []);
  
  const loginUser = (userEmail) => {

    // Update user data as logged in
    UsersDataService.get(userEmail)
    .then(response => {
      console.log("login data");
      console.log(response.data);
      const data = {
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
        password: response.data.password,
        loggedIn: true,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
        adminBlocked: response.data.adminBlocked
      }

      UsersDataService.login(userEmail, data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      setUserFN(response.data.firstname);
      setUserLN(response.data.lastname);
      setUserEmail(response.data.email);
      setUserPassword(response.data.password);
      setUserLoggedIn(true);
      setUserJoinedDate(response.data.createdAt);
      setUserUpdatedDate(response.data.updatedAt);
      setAdminBlocked(response.data.adminBlocked);

    })
    .catch(e => {
      console.log(e);
    });
  }

  const logoutUser = () => {
    UsersDataService.get(userEmail)
    .then(response => {
      const data = {
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
        password: response.data.password,
        loggedIn: false,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
        adminBlocked: response.data.adminBlocked
      }

      UsersDataService.logout(userEmail, data)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch(e => {
      console.log(e);
    });
  
    setUserFN(null);
    setUserLN(null);
    setUserEmail(null);
    setUserPassword(null);
    setUserLoggedIn(null);
    setUserJoinedDate(null);
    setUserUpdatedDate(null);
    setAdminBlocked(null);
  }
 
  console.log(adminPage);
  return (
    
    <div>
      <Context.Provider value = {[adminPage, setAdminPage]}>
      {adminPage ? 
      <>
        <header>
          <Header />
          <Navbar firstname = {userFN} logoutUser = {logoutUser}/>
        </header>
        <Routes>
          <Route exact path = "/" element = {<Home firstname = {userFN}/>}></Route>
          <Route path = "/admin" element = {<Dashboard/>}></Route>
          <Route path = "/manage" element = {<Manage/>}></Route>
          <Route path = "/manage-movie" element = {<ManageMovie/>}></Route>
        </Routes>
        <Footer />
      </>
      :
      <>
      <header>
        <Header />
        <Navbar firstname = {userFN} logoutUser = {logoutUser}/>
      </header>
      <Routes>
        <Route exact path = "/" element = {<Home firstname = {userFN}/>}></Route>
        <Route path = "/admin" element = {<Dashboard/>}></Route>
        <Route path = "/movieinfo" element = {<MovieInfo/>}></Route>
        <Route path = "/reservation" element = {<Reservation/>}></Route>
        <Route path = "/my-reservations" element = {<ReservationsMade/>}></Route>
        <Route path = "/reviews" element = {<Reviews email = {userEmail}/>}></Route>
        <Route path = "/editReview" element = {<EditReview/>}></Route>
        <Route path = "/deletereview" element = {<DeleteReview/>}></Route>
        <Route path = "/profile" element = {<Profile firstname = {userFN} lastname = {userLN} email = {userEmail} 
        joindate = {userJoinedDate} updatedAt = {userUpdatedDate} password = {userPassword} loginUser = {loginUser} logoutUser = {logoutUser}
        adminBlocked = {adminBlocked} />}></Route>
        <Route path = "/signin" element = {<SignIn loginUser = {loginUser}/>}></Route>
        <Route path = "/signup" element = {<SignUp loginUser = {loginUser}/>}></Route>
      </Routes>  
      <Footer />
      </>
      }
      </Context.Provider>
    </div> 


  );
}

export default App;
