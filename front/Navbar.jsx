import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBook, faChalkboardTeacher, faBriefcase, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './styles/Navbar.css';

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="navbar">
      <button onClick={toggleNavbar} className={`navbar-toggle ${isNavbarOpen ? 'open' : 'closed'}`}>
        <FontAwesomeIcon icon={isNavbarOpen ? 'chevron-up' : 'chevron-down'} />
      </button>
      <ul className={`navbar-links ${isNavbarOpen ? 'open' : 'closed'}`}>
        <li><a href="#"><FontAwesomeIcon icon={faHome} />Home</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faUsers} />Users</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faBook} />Practice</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faChalkboardTeacher} />Learning</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faBriefcase} />Job Market</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faChartLine} />Analytics</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faSignOutAlt} />Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
