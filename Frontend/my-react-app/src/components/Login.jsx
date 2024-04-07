import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const userData = await response.json();
        console.log('User data:', userData); // Log the user data

        // Store user data in local storage
        localStorage.setItem('loggedInUserEmail', email);
        localStorage.setItem('loggedInUserName', userData.name);
        localStorage.setItem('loggedInUserId', userData.id);

        // Set user data and isLoggedIn state
        setUserData(userData);
        setIsLoggedIn(true);
        
        // Redirect to homepage after successful login
        navigate('/home');
      } else {
        // If login fails, set error message
        setErrorMessage('Invalid credentials. Please try again or register.');
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    <div className="page">
      <Header heading="Welcome Back!" isLoggedIn={isLoggedIn} userData={userData} />
      <div className="index-container">
        <h2>Login</h2>
        <input
          type="text"
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
        <button onClick={handleLogin}>Login</button>
        {errorMessage && (
          <p>{errorMessage} <Link to="/register">Register</Link></p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Login;























// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
//   const [userData, setUserData] = useState(null); // State to store user data
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
//       // After successful login
//       if (response.ok) {
//         const userData = await response.json();
//         console.log('User data:', userData); // Log the user data
//         // Store user data in state and set isLoggedIn to true
//         setUserData(userData);
//         setIsLoggedIn(true);
//         // Redirect to homepage after successful login
//         navigate('/home');
//       } else {
//         // If login fails, set error message
//         setErrorMessage('Invalid credentials. Please try again or register.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error logging in');
//     }
//   };

//   return (
//     <div className="page">
//       <Header heading="Welcome Back!" />
//       <div className="index-container">
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//         {errorMessage && (
//           <p>{errorMessage} <Link to="/register">Register</Link></p>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Login;
























// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
//       if (response.ok) {
//         const userData = await response.json();
//         // Store user ID and name in localStorage upon successful login
//         localStorage.setItem('loggedInUserID', userData.id);
//         localStorage.setItem('loggedInUserName', userData.name); // Adjusted to use 'name' key
//         console.log("UserID: ", localStorage.getItem('loggedInUserID'), " Name: ", localStorage.getItem('loggedInUserName'));
//         // Redirect to homepage after successful login
//         navigate('/home');
//       } else {
//         // If login fails, set error message
//         setErrorMessage('Invalid credentials. Please try again or register.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error logging in');
//     }
//   };
  

//   return (
//     <div className="page">
//       <Header heading="Welcome Back!" loggedInUserName={false}/>
//       <div className="index-container">
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//         {errorMessage && (
//           <p>{errorMessage} <Link to="/register">Register</Link></p>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Login;
