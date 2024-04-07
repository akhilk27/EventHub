import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './ViewAllEvents.css';

const ViewAllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();  
  }, []);

  const fetchEvents = async () => {
    try {
      const owner_email = window.loggedInUserEmail; // Retrieve email from window object
      console.log("Email ID sending to Query:", owner_email);
      console.log("Local Storage in View-All-Events: ", localStorage);
      const response = await fetch(`http://localhost:8080/view-events?owner_email=${owner_email}&order_by=date,eventtime`);
      if (response.ok) {
        const eventData = await response.json();
        setEvents(eventData);
      } else {
        throw new Error('Failed to fetch events');
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message)
    }
  };

  const joinEvent = async (eventID) => {
    try {
      const response = await fetch('http://localhost:8080/join-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_email: window.loggedInUserEmail, // Retrieve email from window object
          event_id: eventID
        })
      });
      console.log("In ViewAllEvents.jsx")
      console.log("window.loggedInUserEmail: ", window.loggedInUserEmail)
      console.log("window.loggedInUserName: ", window.loggedInUserName)
      console.log("window.loggedInUserId: ", window.loggedInUserId)
      if (response.ok) {
        fetchEvents(); // Trigger reload after joining event
      } else {
        throw new Error('Failed to join event');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const navigateToJoinedEvents = () => {
    window.location.href = '/joined-events'; // Redirect to the page displaying joined events
  };

  return (
    <div className="page">
      <Header heading="View All Events" isLoggedIn={true} userName={window.loggedInUserName} />
      <div className="App">
         
      <div className="event-container">
          {events.length === 0 ? (
            <p className='no-events'>No events found</p>
          ) : (
            events.map(event => (
              <div className="event-card" key={event.id}>
                <h2>{event.name}</h2>
                <p>Date: {new Date(event.eventdate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}</p>
                <p>Time: {event.eventtime}</p>
                <p>Period: {event.eventperiod}</p>
                <p>Current: {event.current}/{event.max}</p>
                <button className='joinButton' onClick={() => joinEvent(event.id)} disabled={event.current >= event.max}>Join</button>
              </div>
            ))
          )}
        </div>
        <button className='goToJoinedEvents' onClick={navigateToJoinedEvents}>Go to Joined Events</button>
      </div>
      <Footer />
    </div>
  );
};
  
export default ViewAllEvents;















// import React, { useEffect, useState } from 'react';
// import Header from './Header';
// import Footer from './Footer';

// const ViewAllEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetchEvents();  
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const owner_email = localStorage.getItem('loggedInUserEmail');
//       console.log("Email ID sending to Query:", owner_email);
//       console.log("Local Storage in View-All-Events: ", localStorage);
//       const response = await fetch(`http://localhost:8080/view-events?owner_email=${owner_email}&order_by=date,eventtime`);
//       if (response.ok) {
//         const eventData = await response.json();
//         setEvents(eventData);
//       } else {
//         throw new Error('Failed to fetch events');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error (e.g., display an error message)
//     }
//   };

//   const joinEvent = async (eventID) => {
//     try {
//       const response = await fetch('http://localhost:8080/join-event', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           user_email: localStorage.getItem('loggedInUserEmail'),
//           event_id: eventID
//         })
//       });
//       if (response.ok) {
//         fetchEvents(); // Trigger reload after joining event
//       } else {
//         throw new Error('Failed to join event');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   const navigateToJoinedEvents = () => {
//     window.location.href = '/joined-events'; // Redirect to the page displaying joined events
//   };

//   return (
//     <div className="page">
//       <Header heading="View All Events" isLoggedIn={true} userName = {localStorage.getItem('loggedInUserName')} />
//       <div>
//       <button onClick={navigateToJoinedEvents}>Joined Events</button>
  
//       <div className="event-container">
//         {events.map(event => (
//           <div className="event-card" key={event.id}>
//             <h2>{event.name}</h2>
//             <p>Date: {new Date(event.eventdate).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: '2-digit',
//               day: '2-digit'
//             })}</p>
//             <p>Time: {event.eventtime}</p>
//             <p>Period: {event.eventperiod}</p>
//             <p>Current: {event.current}/{event.max}</p>
//             <button onClick={() => joinEvent(event.id)} disabled={event.current >= event.max}>Join</button>
//           </div>
//         ))}
//       </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };
  
// export default ViewAllEvents;

















// import React, { useEffect, useState } from 'react';

// const ViewAllEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [userJoinedEvents, setUserJoinedEvents] = useState([]);

//   useEffect(() => {
//     fetchEvents();
//     fetchUserJoinedEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const userEmail = localStorage.getItem('loggedInUserEmail');
//       const response = await fetch(`http://localhost:8080/view-events?owner_email=${userEmail}&order_by=date,eventtime`);
//       if (response.ok) {
//         const eventData = await response.json();
//         setEvents(eventData);
//       } else {
//         throw new Error('Failed to fetch events');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error (e.g., display an error message)
//     }
//   };
  
  

//   const fetchUserJoinedEvents = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/getUserJoinedEvents?user_email=${localStorage.getItem('loggedInUserEmail')}`);
//       if (response.ok) {
//         const eventData = await response.json();
//         setUserJoinedEvents(eventData.joinedEvents);
//       } else {
//         throw new Error('Failed to fetch user joined events');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };
  
  

//   const joinEvent = async (eventID) => {
//     try {
//       const response = await fetch('http://localhost:8080/join-event', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           user_email: localStorage.getItem('loggedInUserEmail'),
//           event_id: eventID
//         })
//       });
//       console.log("Local Storage:", localStorage);
//       if (response.ok) {
//         fetchEvents(); // Trigger reload after joining event
//         fetchUserJoinedEvents(); // Update user joined events after joining an event
//       } else {
//         throw new Error('Failed to join event');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };
  
  

//   const leaveEvent = async (eventID) => {
//     try {
//       const response = await fetch('http://localhost:8080/leave-event', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           participant_id: localStorage.getItem('CustomEventAppParticipantID'),
//           event_id: eventID
//         })
//       });
//       console.log("Local Storage: ",localStorage);
//       if (response.ok) {
//         // Remove the event ID from userJoinedEvents state
//         setUserJoinedEvents(userJoinedEvents.filter(id => id !== eventID));
//         fetchEvents(); // Trigger reload after leaving event
//       } else {
//         throw new Error('Failed to leave event');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };
  


//   const navigateToHome = () => {
//     window.location.href = '/';
//   };

//   return (
//     <div>
//       <button onClick={navigateToHome}>Home</button>
  
//       <div className="event-container">
//         {events.map(event => (
//           <div className="event-card" key={event.id}>
//             <h2>{event.name}</h2>
//             <p>Date: {new Date(event.eventdate).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: '2-digit',
//               day: '2-digit'
//             })}</p>
//             <p>Time: {event.eventtime}</p>
//             <p>Period: {event.eventperiod}</p>
//             <p>Current: {event.current}/{event.max}</p>
//             {userJoinedEvents.includes(event.id) ? (
//               <button onClick={() => leaveEvent(event.id)}>Leave</button>
//             ) : (
//               <button onClick={() => joinEvent(event.id)} disabled={event.current >= event.max}>Join</button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
  
// export default ViewAllEvents;
