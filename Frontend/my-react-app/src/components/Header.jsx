// Header.jsx

import React, { useState } from 'react';

const Header = ({ heading, isLoggedIn, userName }) => {
  return (
    <header>
      <h1>{heading}</h1>
      {isLoggedIn && <p>Signed in as {userName}</p>}
    </header>
  );
};

export default Header;
