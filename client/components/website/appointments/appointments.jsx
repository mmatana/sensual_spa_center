import React from 'react';
import { loadUser } from '../../../actions/authActions';
import { loadAppointments, deleteAppointment, editAppointment } from '../../../actions/appointmentsActions';
import { connect } from 'react-redux';
import Modal from '../components/Modal/Modal';
import EditAppointment from './editAppointment/editAppointment';
import { Link } from 'react-router-dom';

class Appointments extends React.Component {
  componentMount() {
    this.props.loadAppointments();
  }

  renderAppointments() {
    const { appointments } = this.props;
    if (appointments && appointments.length > 0) {
      return appointments.map(app => {
        return (
          <tr key={app.appointment_id}>
            <td>
              <button className="btn btn-danger mr-2" onClick={() => this.props.deleteAppointment(app.appointment_id)}>Delete</button>
              <Modal btnClasses="btn btn-info" title="Update Appointment" classes="d-inline-block ml-3" buttonText="Edit">
                <EditAppointment app={app} />
              </Modal>
            </td>
            <td>{app.appointment_id}</td>
            <td>{app.date}</td>
            <td>{app.time}</td>
          </tr>
        );
      });
    } else if (appointments.length === 0) {
      return 'No Appointments found';
    } else {
      return 'Loading...';
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <Link className="btn btn-primary mb-3 float-right" to={'/online'}>Add New Appointment</Link>
        <table className="table">
          <thead>
            <tr>
              <td>Actions</td>
              <td>ID</td>
              <td>Date</td>
              <td>Time</td>
            </tr>
          </thead>
          <tbody>
            {this.renderAppointments()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    appointments: state.appointment.appointments
  };
};

export default connect(mapStateToProps, { loadUser, loadAppointments, deleteAppointment, editAppointment })(Appointments);
