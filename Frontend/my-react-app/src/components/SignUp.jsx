import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const history = useHistory();

  const handleSignUp = () => {
    // Implement logic to send signup data to backend
    // Redirect to login page after successful signup
    // history.push('/');
    console.log("Handling sign up");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
