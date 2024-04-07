import React from 'react';

const Header = ({ heading, isLoggedIn = false, userName = '', onLogout }) => {
  return (
    <header>
      <h1>{heading}</h1>
      {isLoggedIn && userName && (
        <p>Hi, {userName}!</p>
      )}
    </header>
  );
};

export default Header;
