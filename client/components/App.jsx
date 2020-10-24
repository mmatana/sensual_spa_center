import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Auth from './website/auth/auth';
import Home from './website/Home';
import Appointments from './website/appointments/appointments';
import Services from './website/services/services';
import Testimonials from './website/testimonials/testimonials';
import Entertainment from './website/entertainment/entertainment';
import AddAppointment from './website/appointments/addAppointment';
import Gallery from './website/gallery/gallery';
import AboutUs from './website/AboutUs';
import { connect } from 'react-redux';
import history from '../history';
import './App.css';
import Header from './website/components/Header';

class App extends React.Component {
  render() {
    let routes = (
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/services" exact component={Services} />
          <Route path="/entertainment" exact component={Entertainment} />
          <Route path="/gallery" exact component={Gallery} />
          <Route path="/auth" exact component={Auth} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/services" exact component={Services} />
            <Route path="/entertainment" exact component={Entertainment} />
            <Route path="/gallery" exact component={Gallery} />
            <Route path="/online" exact component={AddAppointment} />
            <Route path="/appointments" exact component={Appointments} />
            <Route path="/testimonials" exact component={Testimonials} />
            <Redirect to="/" />
          </Switch>
        </Router>
      );
    }

    return (
      <div className="container-fluid">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(App);
