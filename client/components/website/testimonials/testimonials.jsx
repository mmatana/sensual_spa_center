import React from 'react';
import { loadTestimonials } from '../../../actions/testimonialsAction';
import { connect } from 'react-redux';
import AddTestimonial from './addTestimonial';

class Testimonials extends React.Component {
  componentMount() {
    this.props.loadTestimonials();
  }

  renderTestimonial() {
    const { testimonials } = this.props;
    if (testimonials && testimonials.length > 0) {
      const lastOne = testimonials[testimonials.length - 1];
      return (
        <div>
          <h2>{lastOne.user_full_name}</h2>
          <p className="lead">
            {lastOne.description}
          </p>
        </div>
      );
    } else if (testimonials && testimonials.length === 0) {
      return 'No Testimonials found';
    } else {
      return 'Loading...';
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h3>Our Happy Clients</h3>
            <AddTestimonial />
          </div>
          <div className="col-md-6">
            {this.renderTestimonial()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    testimonials: state.testimonial.testimonials
  };
};

export default connect(mapStateToProps, { loadTestimonials })(Testimonials);
