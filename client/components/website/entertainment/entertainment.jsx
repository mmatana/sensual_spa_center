import React from 'react';
import { connect } from 'react-redux';
import HeaderPicture from '../components/HeaderPicture';
import './entertainment.css';

class Entertainment extends React.Component {
  render() {
    return (
      <div className="entertainment">
        <HeaderPicture />
        <div className="container mt-5">
          <div className="row top-images">
            <div className="col-md-6">
              <img src="/images/entertaimnet page/loungearea.jpg" className="img-fluid float-left" alt="entertainment-restaurant" />
            </div>
            <div className="col-md-6">
              <img src="/images/entertaimnet page/cafe.jpg" className="img-fluid float-right" alt="entertainment-cafe" />
            </div>
          </div>
          <div className="row down-image">
            <div className="col-md-12">
              <img src="/images/entertaimnet page/kids play area.jpg" className="img-fluid" alt="entertainment-kids" />
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

export default connect(mapStateToProps, {})(Entertainment);
