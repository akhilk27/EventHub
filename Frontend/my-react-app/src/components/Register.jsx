import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, userID })
      });
      if (response.ok) {
        alert('Registration successful');
        navigate('/login');
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <div className="page">
      <Header heading="Welcome to EventHandler!" loggedInUserName={false} />
      <div className="App">
        <div className="index-container">
        <h2 className="registerH2">Register</h2>
        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <input
        type="text"
        placeholder="UserID"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
        />
        <button class="registerButton" onClick={handleRegister}>Register</button>
        <p>Already registered? <a href="/login">Login here</a></p>
      </div>
      </div>     
      <Footer />
    </div>
  );
}

export default Register;
