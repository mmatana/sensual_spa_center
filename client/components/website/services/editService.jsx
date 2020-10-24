import React from 'react';
import { editService } from '../../../actions/servicesActions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import history from '../../../history';

class EditService extends React.Component {
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
          <input type={type} className="form-control input-lg" {...input} defaultValue={this.props.service[input.name]} autoComplete="off" />
          {this.renderError(meta)}
        </div>
      );
    }

    onSubmit = values => {
      const { service } = this.props;
      this.props.editService(service.service_id, values);
    }

    componentDidUpdate(prevProps) {
      const { errors, service } = this.props;
      if (errors.msg !== prevProps.errors.msg) {
        if (errors.id === 'EDIT_SERVICE_ERROR') {
          this.setState({ errorMsg: errors.msg });
        }
      }

      if (service.message === 'Service Updated') {
        history.push('/services');
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
  form: 'editService',
  validate: validateForm
})(EditService);

const mapStateToProps = state => {
  return {
    service: state.service,
    errors: state.error
  };
};

export default connect(mapStateToProps, { editService })(reduxMiddleware);
