import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../../actions/authActions';

import './login.css';

class Login extends React.Component {
    state = {
      errorMsg: undefined
    }

    renderError({ error, touched }) {
      if (error && touched) {
        return <div className="text-danger">{error}</div>;
      }
    }

    renderInput = ({ input, label, meta, type }) => {
      return (
        <div className="form-group">
          <label>{label}</label>
          <input type={type} className="form-control input-lg" autoComplete="off" {...input} />
          {this.renderError(meta)}
        </div>
      );
    }

    onSubmit = values => {
      this.props.login(values);
    }

    componentDidUpdate(prevProps) {
      const { errors } = this.props;
      if (errors.msg !== prevProps.errors.msg) {
        if (errors.id === 'LOGIN_FAIL') {
          this.setState({ errorMsg: errors.msg });
        }
      }
    }

    render() {
      return (
        <section className="login">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 holder">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <div className="row justify-content-center">
                    <div className="col-md-3 text-center">
                      <h3>Sign in</h3>
                      <span className="border-b"></span>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                      {this.state.errorMsg ? <div className="alert alert-danger">{this.state.errorMsg}</div> : ''}
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-10">
                      <Field name="email" type="text" label="Email" component={this.renderInput} />
                    </div>
                    <div className="col-md-10">
                      <Field name="password" type="password" label="Password" component={this.renderInput} />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                      <button className="btn login-button">Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
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

  return errors;
};

const reduxMiddleware = reduxForm({
  form: 'login',
  validate: validateForm
})(Login);

const mapStateToProps = state => {
  return {
    errors: state.error
  };
};

export default connect(mapStateToProps, { login })(reduxMiddleware);
