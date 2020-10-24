import React from 'react';
import { loadServices } from '../../../actions/servicesActions';
import { connect } from 'react-redux';
class Services extends React.Component {
  componentMount() {
    this.props.loadServices();
  }

  renderServices() {
    const { services } = this.props;
    if (services && services.length > 0) {
      return services.map(service => {
        return (
          <tr key={service.service_id}>
            <td>{service.service_name}</td>
            <td>{service.description}</td>
          </tr>
        );
      });
    } else if (services.length === 0) {
      return 'No Services found';
    } else {
      return 'Loading...';
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            {this.renderServices()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    services: state.service.services
  };
};

export default connect(mapStateToProps, { loadServices })(Services);
