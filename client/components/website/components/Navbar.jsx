import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/authActions';

import './Navbar.css';

class Navbar extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link class="nav-link" to={'/about-us'}>About us</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" to={'/services'}>Services</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" to={'/appointments'}>Appointments</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" to={'/online'}>Online</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" to={'/entertainment'}>Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" to={'/gallery'}>Gallery</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" to={'/testimonials'}>Testimonials</Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><Link className="nav-link" onClick={() => this.props.logout()}>Logout</Link></li>
            </ul>
          ) : <ul className="navbar-nav ml-auto">
            <li className="nav-item"><Link to={'/auth'} className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to={'/auth'} className="nav-link">Register</Link></li>
          </ul> }
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
