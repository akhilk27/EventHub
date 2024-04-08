// App.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './App1.css';


function App() {
  return (
    <div className="page">
      <Header heading="Event Handler" loggedInUserName={false} className="header"/>
      <div className="App">
        <div className="index-container">
          <h2 className="App-cont">Welcome!</h2>
          <p className="App-cont">Are you a registered user?</p>
          <div className="linksClass">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default App;






// import React, { useState } from 'react';
// import Login from './Login.jsx';
// import Register from './Register.jsx';

// function App() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   const handleLoginClick = () => {
//     setShowLogin(true);
//     setShowRegister(false);
//   };

//   const handleRegisterClick = () => {
//     setShowLogin(false);
//     setShowRegister(true);
//   };

//   return (
//     <div className="App">
//       {showLogin ? (
//         <Login />
//       ) : showRegister ? (
//         <Register />
//       ) : (
//         <div className="index-container">
//           <h2>Welcome!</h2>
//           <p>Are you a registered user?</p>
//           <button onClick={handleLoginClick}>Login</button>
//           <button onClick={handleRegisterClick}>Register</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;













// // import React, { useState } from "react";

// // function App() {
// //   const [contact, setContact] = useState({
// //     fName: "",
// //     lName: "",
// //     email: ""
// //   });

// //   function handleChange(event) {
// //     const { name, value } = event.target;

// //     setContact(prevValue => {
// //       return {
// //         ...prevValue,
// //         [name]: value
// //       };
// //     });
// //   }

// //   return (
// //     <div className="container">
// //       <h1>
// //         Hello {contact.fName} {contact.lName}
// //       </h1>
// //       <p>{contact.email}</p>
// //       <form>
// //         <input
// //           onChange={handleChange}
// //           name="fName"
// //           value={contact.fName}
// //           placeholder="First Name"
// //         />
// //         <input
// //           onChange={handleChange}
// //           name="lName"
// //           value={contact.lName}
// //           placeholder="Last Name"
// //         />
// //         <input
// //           onChange={handleChange}
// //           name="email"
// //           value={contact.email}
// //           placeholder="Email"
// //         />
// //         <button>Submit</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default App;
