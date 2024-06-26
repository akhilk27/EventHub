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
      const owner_email = localStorage.getItem('loggedInUserEmail'); // Retrieve email from localStorage
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
          user_email: localStorage.getItem('loggedInUserEmail'), // Retrieve email from localStorage
          event_id: eventID
        })
      });
      console.log("In ViewAllEvents.jsx")
      console.log("localStorage.loggedInUserEmail: ", localStorage.getItem('loggedInUserEmail'))
      console.log("localStorage.loggedInUserName: ", localStorage.getItem('loggedInUserName'))
      console.log("localStorage.loggedInUserId: ", localStorage.getItem('loggedInUserId'))
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
  const goToHome = () => {
    window.location.href = '/home'; // Redirect to home page
  };

  return (
    <div className="page">
      <Header heading="View All Events Around You!!" isLoggedIn={true} userName={localStorage.getItem('loggedInUserName')} />
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
        <div>
          <button className='goToJoinedEvents' onClick={navigateToJoinedEvents}>Go to Joined Events</button>
        </div>
        <button className="goToHomeButton vae-to-home" onClick={goToHome}>Home</button>
      </div>
      <Footer />
    </div>
  );
};
  
export default ViewAllEvents;


