import React from 'react';
import { connect } from 'react-redux';
import './upperNav.css';
class UpperNav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <span>Sensual spa center</span>
          </div>
          <div className="navbar-nav ml-auto">
            <span>Make online appointment
              <br />
                            or call
              <br />
                            0000 000 000
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(null, {})(UpperNav);
