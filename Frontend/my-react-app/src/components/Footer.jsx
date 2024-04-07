import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="copyright">Akhilesh © {currentYear}</div>
    </footer>
  );
}

export default Footer;
