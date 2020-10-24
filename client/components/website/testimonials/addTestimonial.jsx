import React from 'react';
import { addTestimonial } from '../../../actions/testimonialsAction';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
class AddTestimonial extends React.Component {
    state = {
      message: undefined
    }

    renderError({ error, touched }) {
      if (error && touched) {
        return <div className="text-danger">{error}</div>;
      }
    }

    renderTextArea = ({ input, label, meta, name, type }) => {
      return (
        <div className="form-group">
          <label>{label}</label>
          <textarea type={type} className="form-control input-lg" {...input} autoComplete="off">

          </textarea>
          {this.renderError(meta)}
        </div>
      );
    }

    componentDidUpdate(prevProps) {
      const { errors } = this.props;
      if (errors.msg !== prevProps.errors.msg) {
        if (errors.id === 'ADD_TESTIMONIAL_ERROR') {
          this.setState({ errorMsg: errors.msg });
        }
      }
    }

    onSubmit = values => {
      this.props.addTestimonial(values);
    }

    render() {
      const { message } = this.props.testimonial;
      return (
        <div className="container mb-5">
          <div className="row">
            <div className="col-md-12">
              { message ? <div className="alert alert-success">{message}</div> : ''}
              <h2 className="mt-5">Add Testimonial</h2>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="description" type="text" label="Description" component={this.renderTextArea} />
                <button className="btn btn-primary" type="submit">Add Testimonial</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
}

const validateForm = formValues => {
  const errors = {};

  if (!formValues.description) {
    errors.description = 'Please add description';
  }

  return errors;
};

const reduxMiddleware = reduxForm({
  form: 'addTestimonial',
  validate: validateForm
})(AddTestimonial);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    testimonial: state.testimonial,
    errors: state.error
  };
};

export default connect(mapStateToProps, { addTestimonial })(reduxMiddleware);
