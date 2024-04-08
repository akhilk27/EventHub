import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './HomePage.css';

const Homepage = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Remove user details from localStorage
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserName');
    localStorage.removeItem('loggedInUserId');
    // Navigate user to the '/' route
    navigate('/');
  };

  const redirectTo = (path) => {
    // Redirect user to the specified path
    console.log("Going to path:", path);
    console.log("localStorage.loggedInUserEmail: ", localStorage.getItem('loggedInUserEmail'));
    console.log("localStorage.loggedInUserName: ", localStorage.getItem('loggedInUserName'));
    console.log("localStorage.loggedInUserId: ", localStorage.getItem('loggedInUserId'));
    navigate(path);
  };

  return (
    <div className="page">
      <Header heading="Event Hub" isLoggedIn={true} userName={localStorage.getItem('loggedInUserName')} onLogout={handleLogout} />
      <div className="App">
        <h1 className="hp-h1">Welcome to the Event Hub!</h1>
        <p className="hp-p">Connect with like-minded individuals and explore exciting events.</p>
        <div className="homeButtonsDiv">
          <button className="homeButtons" onClick={() => redirectTo('/create-event')}>Create an Event</button>
          <button className="homeButtons" onClick={() => redirectTo('/view-events')}>Join an Event</button>
          <button className="homeButtons" onClick={() => redirectTo('/view-dashboard')}>View My Dashboard</button>
          <button className="homeButtons" onClick={() => redirectTo('/joined-events')}>Joined Events</button>
        </div>
        {/* Logout button */}
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;


