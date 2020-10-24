import React from 'react';
import { connect } from 'react-redux';
import HeaderPicture from '../components/HeaderPicture';
import './gallery.css';

class Gallery extends React.Component {
  render() {
    return (
      <div className="gallery">
        <HeaderPicture />
        <div className="container mt-5">
          <div className="row images">
            <div className="col-md-3">
              <img src="/images/galary page/cafe.jpg" className="img-fluid float-left" alt="gallery-cafe" />
            </div>
            <div className="col-md-3">
              <img src="/images/galary page/facemassage.jpg" className="img-fluid float-left" alt="gallery-facemassage" />
            </div>
            <div className="col-md-3">
              <img src="/images/galary page/fire room.jpg" className="img-fluid float-left" alt="gallery-fire room" />
            </div>
            <div className="col-md-3">
              <img src="/images/galary page/footmassage.jpg" className="img-fluid float-left" alt="gallery-footmassage" />
            </div>
          </div>
          <div className="row images">
            <div className="col-md-3">
              <img src="/images/galary page/Forest room.jpg" className="img-fluid float-left" alt="gallery-Forest room" />
            </div>
            <div className="col-md-3">
              <img src="/images/galary page/massage.jpg" className="img-fluid float-left" alt="gallery-massage" />
            </div>
            <div className="col-md-3">
              <img src="/images/galary page/salt room.jpg" className="img-fluid float-left" alt="gallery-salt room" />
            </div>
            <div className="col-md-3">
              <img src="/images/galary page/pool area.jpg" className="img-fluid float-left" alt="gallery-pool area" />
            </div>
          </div>
          <div className="row images">
            <div className="col-md-3">
              <img src="/images/galary page/massage1.jpg" className="img-fluid float-left" alt="gallery-massage1" />
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

export default connect(mapStateToProps, {})(Gallery);
