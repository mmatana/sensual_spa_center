import React from 'react';
import { loadUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import HeaderPicture from './components/HeaderPicture';
import './Home.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div className="landing-page">
        {/* <Header /> */}
        <HeaderPicture />
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-3 text-center">
              <div className="image">
                <img src="/images/salt room.jpg" className="img-fluid" alt="salt room" />
              </div>
              <h3 className="mt-3">Salt Room</h3>
            </div>
            <div className="col-md-3 text-center">
              <div className="image">
                <img src="/images/Forest room.jpg" className="img-fluid" alt="Forest room" />
              </div>
              <h3 className="mt-3">Forest Room</h3>
            </div>
            <div className="col-md-3 text-center">
              <div className="image">
                <img src="/images/fire room.jpg" className="img-fluid" alt="fire room" />
              </div>
              <h3 className="mt-3">Fire Room</h3>
            </div>
            <div className="col-md-3 text-center">
              <div className="image">
                <img src="/images/pool area.jpg" className="img-fluid" alt="pool area" />
              </div>
              <h3 className="mt-3">Pool Area</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { loadUser })(Home);
