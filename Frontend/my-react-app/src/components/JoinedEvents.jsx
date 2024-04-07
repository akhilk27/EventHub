import React, { useEffect, useState } from 'react';

const JoinedEvents = () => {
  const [eventsByUser, setEventsByUser] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8080/joined-events?user_email=${localStorage.getItem('loggedInUserEmail')}`);
      if (response.ok) {
        const data = await response.json();
        setEventsByUser(data.attendedEvents);
      } else {
        throw new Error('Failed to fetch events');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const leaveEvent = async (eventID) => {
    try {
      const response = await fetch('http://localhost:8080/leave-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_email: localStorage.getItem('loggedInUserEmail'),
          event_id: eventID
        })
      });
      console.log("Local Storage: ",localStorage);
      if (response.ok) {
        // Filter out the event from the eventsByUser state
        setEventsByUser(eventsByUser.filter(event => event.id !== eventID));
      } else {
        throw new Error('Failed to leave event');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const goToStart = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <button onClick={goToStart}>Start</button>

      <div className="event-container">
        {eventsByUser.length > 0 ? (
          eventsByUser.map(event => (
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
              <button onClick={() => leaveEvent(event.id)}>Leave</button>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;