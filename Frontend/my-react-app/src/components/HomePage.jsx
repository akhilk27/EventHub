import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './HomePage.css';

const Homepage = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Remove user details from window object
    window.loggedInUserEmail = null;
    window.loggedInUserName = null;
    window.loggedInUserId = null;
    // Navigate user to the '/' route
    navigate('/');
  };

  const redirectTo = (path) => {
    // Redirect user to the specified path
    console.log("Going to path:", path);
    console.log("window.loggedInUserEmail: ", window.loggedInUserEmail);
    console.log("window.loggedInUserName: ", window.loggedInUserName);
    console.log("window.loggedInUserId: ", window.loggedInUserId);
    navigate(path);
  };

  return (
    <div className="page">
      <Header heading="Event Hub" isLoggedIn={true} userName={window.loggedInUserName} onLogout={handleLogout} />
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















// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';

// const Homepage = () => {
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   // Retrieve user's name from local storage
//   //   const name = localStorage.getItem('loggedInUserName');
//   //   setUserName(name);
//   // }, []);

//   // Function to handle logout
//   const handleLogout = () => {
//     // Remove user details from local storage
//     localStorage.removeItem('loggedInUserEmail');
//     localStorage.removeItem('loggedInUserName');
//     localStorage.removeItem('loggedInUserId');
//     // Navigate user to the '/' route
//     navigate('/');
//   };

//   const redirectTo = (path) => {
//     // Redirect user to the specified path
//     navigate(path);
//   };

//   return (
//     <div>
//       <Header heading="Event Hub" isLoggedIn={true} userName={localStorage.getItem('loggedInUserName')} onLogout={handleLogout} />
//       <div>
//         <h1>Welcome to the Event Hub!</h1>
//         <p>Connect with like-minded individuals and explore exciting events.</p>
//         <div>
//           <button onClick={() => redirectTo('/create-event')}>Create an Event</button>
//           <button onClick={() => redirectTo('/view-events')}>Join an Event</button>
//           <button onClick={() => redirectTo('/view-dashboard')}>View My Dashboard</button>
//           <button onClick={() => redirectTo('/joined-events')}>Joined Events</button>
//         </div>
//         {/* Logout button */}
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Homepage;









