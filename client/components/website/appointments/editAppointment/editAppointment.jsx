import React from 'react';
import { editAppointment } from '../../../../actions/appointmentsActions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import history from '../../../../history';

class EditAppointment extends React.Component {
    state = {
      errorMsg: undefined
    }

    renderError({ error, touched }) {
      if (error && touched) {
        return <div className="text-danger">{error}</div>;
      }
    }

    renderInput = ({ input, label, meta, name, type }) => {
      input.value = undefined;
      return (
        <div className="form-group">
          <label>{label}</label>
          <input type={type} className="form-control input-lg" {...input} defaultValue={this.props.app[input.name]} autoComplete="off" />
          {this.renderError(meta)}
        </div>
      );
    }

    onSubmit = values => {
      const { app } = this.props;
      this.props.editAppointment(app.appointment_id, values);
    }

    componentDidUpdate(prevProps) {
      const { errors, appointment } = this.props;
      if (errors.msg !== prevProps.errors.msg) {
        if (errors.id === 'EDIT_APPOINTMENT_ERROR') {
          this.setState({ errorMsg: errors.msg });
        }
      }

      if (appointment.message === 'Appointment Updated') {
        history.push('/appointments');
      }
    }

    render() {
      const { errorMsg } = this.state;
      return (
        <div className="container">
          <div className="row justify-content-center">
            { errorMsg ? <div className="alert">{this.state.errorMsg}</div> : ''}
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="col-md-12">
                <Field name="time" type="time" label="Time" component={this.renderInput} />
              </div>
              <div className="col-md-12">
                <Field name="date" type="date" label="Date" component={this.renderInput} />
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                  <button className="btn login-button" type="submit">Update</button>
                </div>
              </div>
            </form>
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
  form: 'editAppointment',
  validate: validateForm
})(EditAppointment);

const mapStateToProps = state => {
  return {
    appointment: state.appointment,
    errors: state.error
  };
};

export default connect(mapStateToProps, { editAppointment })(reduxMiddleware);
