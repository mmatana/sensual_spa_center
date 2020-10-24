import React from 'react';
import { connect } from 'react-redux';
import HeaderPicture from './components/HeaderPicture';

class AboutUs extends React.Component {
  render() {
    return (
      <div>
        <HeaderPicture />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="image">
                <img src="/images/header-picture.jpg" alt="about-us" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6">
                            Lorem Ipsum is simply dummy text of
                            the printing and typesetting industry. Lorem Ipsum has been the industry
                            standard dummy text ever since the 1500s, when an unknown printer took a galley
                            of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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

export default connect(mapStateToProps, {})(AboutUs);
