import React from 'react';
import { FaTachometerAlt, FaUsers, FaBook, FaLaptopCode, FaBriefcase, FaMedal, FaGamepad, FaSignOutAlt } from 'react-icons/fa';
import './styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li><a href="#"><FaTachometerAlt /></a></li>
        <li><a href="#"><FaUsers /></a></li>
        <li><a href="#"><FaBook /></a></li>
        <li><a href="#"><FaLaptopCode /></a></li>
        <li><a href="#"><FaBriefcase /></a></li>
        <li><a href="#"><FaMedal /></a></li>
        <li><a href="#"><FaGamepad /></a></li>
        <li><a href="#" ><FaSignOutAlt /></a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
