import React from 'react';
import { addAppointment } from '../../../actions/appointmentsActions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import HeaderPicture from '../components/HeaderPicture';
import history from '../../../history';

class AddAppointment extends React.Component {
  renderError({ error, touched }) {
    if (error && touched) {
      return <div className="text-danger">{error}</div>;
    }
  }

    renderInput = ({ input, label, meta, name, type }) => {
      return (
        <div className="form-group">
          <label>{label}</label>
          <input type={type} className="form-control input-lg" {...input} autoComplete="off" />
          {this.renderError(meta)}
        </div>
      );
    }

    componentDidUpdate(prevProps) {
      const { errors, appointment } = this.props;
      if (errors.msg !== prevProps.errors.msg) {
        if (errors.id === 'ADD_APPOINTMENT_ERROR') {
          this.setState({ errorMsg: errors.msg });
        }
      }

      if (appointment.message === 'Appointment Added') {
        history.push('/appointments');
      }
    }

    onSubmit = values => {
      this.props.addAppointment(values);
    }

    render() {
      return (
        <div className="container mb-5">
          <HeaderPicture />
          <div className="row">
            <div className="col-md-12">
              <h2 className="mt-5">Add Appointment</h2>
            </div>
            <div className="col-md-6">
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="col-md-12">
                  <Field name="time" type="time" label="Time" component={this.renderInput} />
                </div>
                <div className="col-md-12">
                  <Field name="date" type="date" label="Date" component={this.renderInput} />
                </div>
                <button className="btn btn-primary" type="submit">Add Appointment</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
}

const validateForm = formValues => {
  const errors = {};

  if (!formValues.time) {
    errors.time = 'Please add time';
  }

  if (!formValues.date) {
    errors.date = 'Please add date';
  }

  return errors;
};

const reduxMiddleware = reduxForm({
  form: 'addAppointment',
  validate: validateForm
})(AddAppointment);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    appointment: state.appointment,
    errors: state.error
  };
};

export default connect(mapStateToProps, { addAppointment })(reduxMiddleware);
