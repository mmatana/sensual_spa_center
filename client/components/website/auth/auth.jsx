import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/authActions';

import Login from './Login';
import Register from './Register';

class Navbar extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Login />
          </div>
          <div className="col-md-6">
            <Register />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(Navbar);
