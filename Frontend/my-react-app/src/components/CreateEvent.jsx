import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './CreateEvent.css';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPeriod, setEventPeriod] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [location, setLocation] = useState('');
  const [additionaldetails, setadditionaldetails] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (min < 0 || max < 0) {
      alert('Min and Max values cannot be negative');
      return;
    }
    if (min > max) {
      alert('Minimum players cannot be greater than maximum players');
      return;
    }
    if (name === '' || eventTime === '' || eventDate === '' || eventPeriod === '' || location === '' || additionaldetails === '') {
      alert('Please fill out all fields');
      return;
    }
    try {
      // Retrieve email from localStorage
      const owner_email = localStorage.getItem('loggedInUserEmail');
  
      // Send create event request with all form field values
      const createEventResponse = await fetch('http://localhost:8080/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          owner_email, // Include email in the request body
          eventDate,
          eventTime,
          eventPeriod,
          min,
          max,
          current: 0,
          location,
          additionaldetails
        })
      });

      console.log(owner_email);

      console.log("CreateEventResponse:", createEventResponse);
  
      if (createEventResponse.ok) {
        alert('Event created successfully');
        // Redirect or navigate to the page displaying all events     
        window.location.href = '/view-dashboard';
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
  };
  
  const goToHome = () => {
    window.location.href = '/home'; // Redirect to home page
  };

  return (
    <div className = "page">
      <Header heading="Make Your Own Event!!" isLoggedIn={true} userName={localStorage.getItem('loggedInUserName')} />
      <div className='App'>
        <form className='form' onSubmit={handleSubmit}>
          <label>
            Event Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <br />
          <label>
            Event Time:
            <input type="time" value={eventTime} onChange={(event) => setEventTime(event.target.value)} />
          </label>
          <br />
          <label>
            Event Date:
            <input type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} />
          </label>
          <br />
          <label>
            Min People:
            <input type="number" value={min} onChange={(event) => setMin(Math.max(parseInt(event.target.value), 0))} />
          </label>
          <br />
          <label>
            Max People:
            <input type="number" value={max} onChange={(event) => setMax(Math.max(parseInt(event.target.value), 0))} />
          </label>
          <br />
          <label>
            Location:
            <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
          </label>
          <br />
          <label>
            Additional Details:
            <input type="text" value={additionaldetails} onChange={(event) => setadditionaldetails(event.target.value)} />
          </label>
          <br />
          <label className="dropdown">
            Event Length:
            <select value={eventPeriod} onChange={(event) => setEventPeriod(event.target.value)}>
              <option value="">Select event period</option>
              <option value="30 mins">30 mins</option>
              <option value="1 hour">1 hour</option>
              <option value="1.5 hours">1.5 hours</option>
              <option value="2 hours">2 hours</option>
              <option value="2.5 hours">2.5 hours</option>
              <option value="3 hours">3 hours</option>
              <option value="3.5 hours">3.5 hours</option>
              <option value="4 hours">4 hours</option>
              <option value="4.5 hours">4.5 hours</option>
              <option value="5 hours">5 hours</option>
              <option value="5.5 hours">5.5 hours</option>
              <option value="6 hours">6 hours</option>
              <option value="6.5 hours">6.5 hours</option>
              <option value="7 hours">7 hours</option>
              <option value="7.5 hours">7.5 hours</option>
              <option value="8 hours">8 hours</option>
            </select>
          </label>
          <button className="createEventButton" type="submit">Create Event</button>
        </form>
        <button className="goToHomeButton" onClick={goToHome}>Home</button>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;



