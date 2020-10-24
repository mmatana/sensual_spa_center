import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/authActions';

import './HeaderPicture.css';

class HeaderPicture extends React.Component {
  render() {
    return (
      <div className="headerPicture mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-5">
              <div className="headerPictureImage">
                <h4>Open your mind and rejuvenate your body</h4>
              </div>
            </div>
            <div className="col-md-12">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took
                            a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(HeaderPicture);
