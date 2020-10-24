import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { register } from '../../../actions/authActions';
import './register.css';

class Register extends React.Component {
    state = {
      message: ''
    }

    renderError({ error, touched }) {
      if (error && touched) {
        return <div className="text-danger">{error}</div>;
      }
    }

    renderInput = ({ input, label, meta, type, required }) => {
      return (
        <div className="form-group">
          <label>{label} {required === true ? '*' : ''}</label>
          <input type={type} className="form-control input-lg" autoComplete="off" {...input} />
          {this.renderError(meta)}
        </div>
      );
    }

    onSubmit = values => {
      this.props.register(values);
    }

    componentDidUpdate(prevProps) {
      const { errors } = this.props;
      if (errors !== prevProps.errors) {
        if (errors.id === 'REGISTER_FAIL') {
          this.setState({ message: errors.msg });
        }
      }
    }

    render() {
      return (
        <div>
          <section className="register page10">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-10 holder">
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                      <h3>Register a new account</h3>
                      <span className="border-b"></span>
                    </div>
                  </div>
                  {this.props.isAuthenticated ? <div className="alert alert-success">User registered</div> : ''}
                  {this.state.message ? (<div className="alert alert-danger">{this.state.message}</div>) : ''}
                  <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="row justify-content-center">
                      <div className="col-md-10">
                        <Field name="fullName" required={true} type="text" label="fullName" component={this.renderInput} />
                      </div>
                      <div className="col-md-10">
                        <Field name="email" required={true} type="text" label="Email" component={this.renderInput} />
                      </div>
                      <div className="col-md-10">
                        <Field name="password" required={true} type="password" label="Password" component={this.renderInput} />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-6 text-center">
                        <button className="btn register-button">Sign Up</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
}

const validateForm = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Please add email';
  }

  if (!formValues.password) {
    errors.password = 'Please add password';
  }

  if (!formValues.fullName) {
    errors.fullName = 'Please add fullName';
  }

  return errors;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.error
});

const reduxMiddleware = reduxForm({
  form: 'register',
  validate: validateForm
})(Register);

export default connect(mapStateToProps, { register })(reduxMiddleware);
