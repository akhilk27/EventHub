import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="index-container">
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>

      <p>Already registered? <a href="/login">Login here</a></p>
    </div>
  );
}

export default Register;
