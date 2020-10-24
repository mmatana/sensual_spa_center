import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/authActions';
import Navbar from './Navbar';
import UpperNav from './upperNav';

import './header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <UpperNav />
        <Navbar />
      </div>
    );
  }
}

export default connect(null, { logout })(Header);
