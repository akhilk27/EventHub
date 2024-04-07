import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Homepage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Retrieve user's name from local storage
  //   const name = localStorage.getItem('loggedInUserName');
  //   setUserName(name);
  // }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Remove user details from local storage
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserName');
    localStorage.removeItem('loggedInUserId');
    // Navigate user to the '/' route
    navigate('/');
  };

  const redirectTo = (path) => {
    // Redirect user to the specified path
    navigate(path);
  };

  return (
    <div>
      <Header heading="Event Hub" isLoggedIn={true} userName={localStorage.getItem('loggedInUserName')} onLogout={handleLogout} />
      <div>
        <h1>Welcome to the Event Hub!</h1>
        <p>Connect with like-minded individuals and explore exciting events.</p>
        <div>
          <button onClick={() => redirectTo('/create-event')}>Create an Event</button>
          <button onClick={() => redirectTo('/view-events')}>Join an Event</button>
          <button onClick={() => redirectTo('/view-dashboard')}>View My Dashboard</button>
          <button onClick={() => redirectTo('/joined-events')}>Joined Events</button>
        </div>
        {/* Logout button */}
        <button onClick={handleLogout}>Logout</button>
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

//   const redirectTo = (path) => {
//     // Redirect user to the specified path
//     navigate(path);
//   };

//   const logout = () => {
//     // Perform logout actions (You can replace this logic with your own)
//     localStorage.removeItem('isLoggedIn');
//     navigate('/');
//   };

//   return (
//     <div>
//       <Header heading="Event Hub" isLoggedIn={true} onLogout={logout} />
//       <div>
//         <h1>Welcome to the Event Hub!</h1>
//         <p>Connect with like-minded individuals and explore exciting events.</p>
//         <div>
//           <button onClick={() => redirectTo('/create-event')}>Create an Event</button>
//           <button onClick={() => redirectTo('/view-events')}>Join an Event</button>
//           <button onClick={() => redirectTo('/view-dashboard')}>View My Dashboard</button>
//           <button onClick={() => redirectTo('/joined-events')}>Joined Events</button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Homepage;








// import React from 'react';
// import { useHistory } from 'react-router-dom';

// const Homepage = () => {
//   const history = useHistory();

//   const isUserLoggedIn = () => {
//     // Check if user is logged in (You can replace this logic with your own)
//     return localStorage.getItem('isLoggedIn') === 'true';
//   };

//   const redirectTo = (path) => {
//     // Redirect user to the specified path
//     history.push(path);
//   };

//   const logout = () => {
//     // Perform logout actions (You can replace this logic with your own)
//     localStorage.removeItem('isLoggedIn');
//     history.push('/');
//   };

//   return (
//     <div>
//       <h1>Welcome to the Event Hub!</h1>
//       <p>Connect with like-minded individuals and explore exciting events.</p>
//       <div>
//         <button onClick={() => redirectTo('/create-event')}>Create an Event</button>
//         <button onClick={() => redirectTo('/join-event')}>Join an Event</button>
//         <button onClick={() => redirectTo('/user-dashboard')}>View My Dashboard</button>
//         <button onClick={() => redirectTo('/joined-events')}>Joined Events</button>
//       </div>
//       {isUserLoggedIn() ? (
//         <div>
//           <p>Logged in as {localStorage.getItem('username')}</p>
//           <button onClick={logout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <p>Not logged in</p>
//           <button onClick={() => redirectTo('/login')}>Login</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Homepage;
