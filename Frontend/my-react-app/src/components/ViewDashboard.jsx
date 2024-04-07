import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './ViewDashboard.css';

const ViewDashboard = () => {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      const userEmail = window.loggedInUserEmail; // Retrieve email from window object
      const response = await fetch(`http://localhost:8080/view-dashboard?email=${userEmail}`);
      if (response.ok) {
        const eventData = await response.json();
        setUserEvents(eventData);
      } else {
        throw new Error('Failed to fetch user events');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message)
    }
  };

  const navigateToHome = () => {
    window.location.href = '/home';
  };

  const redirectToCreateEvent = () => {
    window.location.href = '/create-event';
  };

  const navigateToEventDetails = (id) => {
    window.UserAppEventID = id; // Set event ID in window object
    window.location.href = '/event-details';
  };

  const handleEventDeletion = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/delete-event/${eventId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted event from the userEvents state
        setUserEvents(userEvents.filter(event => event.id !== eventId));
        // Redirect to the view-dashboard page
        window.location.href = '/view-dashboard';
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="page">
      <Header heading="Your Dashboard" isLoggedIn={true} userName={window.loggedInUserName} />
      <div className="App">
        <div className="container">
          {userEvents.map(event => (
            <div className="user-event-card" key={event.id}>
              <h2>{event.name}</h2>
              <br />
              <p>Date: {new Date(event.eventdate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</p>
              <p>Time: {event.eventtime}</p>
              <p>Period: {event.eventperiod}</p>
              <p>Min: {event.min}</p>
              <p>Max: {event.max}</p>
              <p>Head Count: {event.current}</p>
              <p>Location: {event.location}</p>
              <p>Details: {event.additionaldetails}</p>
              {/* <button onClick={() => navigateToEventDetails(event.id)}>Details</button> */}
              <button className="deleteEvent" onClick={() => handleEventDeletion(event.id)}>Delete</button>
            </div>
          ))}
        </div>
        <button className="makeNewEvent" onClick={redirectToCreateEvent}>Create New Event</button>
        <button className="makeNewEvent" onClick={navigateToHome}>Home</button>
      </div>
      <Footer />
    </div>
  );
};

export default ViewDashboard;





















// import React, { useEffect, useState } from 'react';
// import Header from './Header';
// import Footer from './Footer';

// const ViewDashboard = () => {
//   const [userEvents, setUserEvents] = useState([]);

//   useEffect(() => {
//     fetchUserEvents();
//   }, []);

//   const fetchUserEvents = async () => {
//     try {
//       const userEmail = localStorage.getItem('loggedInUserEmail');
//       const response = await fetch(`http://localhost:8080/view-dashboard?email=${userEmail}`);
//       if (response.ok) {
//         const eventData = await response.json();
//         setUserEvents(eventData);
//       } else {
//         throw new Error('Failed to fetch user events');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error (e.g., display an error message)
//     }
//   };

//   const navigateToHome = () => {
//     window.location.href = '/home';
//   };

//   const redirectToCreateEvent = () => {
//     window.location.href = '/create-event';
//   };

//   const navigateToEventDetails = (id) => {
//     localStorage.setItem('UserAppEventID', id);
//     window.location.href = '/event-details';
//   };

//   const handleEventDeletion = async (eventId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/delete-event/${eventId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         // Remove the deleted event from the userEvents state
//         setUserEvents(userEvents.filter(event => event.id !== eventId));
//         // Redirect to the view-dashboard page
//         window.location.href = '/view-dashboard';
//       } else {
//         throw new Error('Failed to delete event');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error (e.g., display an error message)
//     }
//   };

//   return (
//     <div className="page">
//       <Header heading="Your Dashboard" isLoggedIn={true} userName = {localStorage.getItem('loggedInUserName')} />
//       <div>
//       <button onClick={navigateToHome}>Home</button>

//       <div className="container">
//         {userEvents.map(event => (
//           <div className="user-event-card" key={event.id}>
//             <h2>{event.name}</h2>
//             <br />
//             <p>Date: {new Date(event.eventdate).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: '2-digit',
//               day: '2-digit'
//             })}</p>
//             <p>Time: {event.eventtime}</p>
//             <p>Period: {event.eventperiod}</p>
//             <p>Min: {event.min}</p>
//             <p>Max: {event.max}</p>
//             <p>Head Count: {event.current}</p>
//             <p>Location: {event.location}</p>
//             <p>Details: {event.additionaldetails}</p>
//             {/* <button onClick={() => navigateToEventDetails(event.id)}>Details</button> */}
//             <button onClick={() => handleEventDeletion(event.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//       <div className="user-event-card">
//         <button onClick={redirectToCreateEvent}>Create New Event</button>
//       </div>
//     </div>

//     <Footer />


//     </div>
//   );
// };

// export default ViewDashboard;
