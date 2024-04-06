import React from 'react';

function Header({ isLoggedIn, firstName }) {
  return (
    <header className="header">
      <div className="logo">Event Handler</div>
      {isLoggedIn && <div className="user-info">Logged in as {firstName}</div>}
    </header>
  );
}

export default Header;
