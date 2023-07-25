import React from 'react';
import Logo from './Logo';

class Nav extends React.Component {
    render() {
      return (
        <div style={{
          position:'fixed',
          top:'0',
          left: '0',
          right: '0',
          zIndex: '999'
        
        }}>

        
        <nav>
          <Logo />
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav></div>
      );
    }
  }
export default Nav;  