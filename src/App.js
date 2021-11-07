import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import NavigationBar from './components/NavigationBar';
import PasswordReset from './components/PasswordReset';
import ForgetPassword from './components/ForgetPassword';
import Profile from './components/Profile';
import Assessment from './components/Assessment';
import AssessmentStudent from './components/AssessmentStudent';
import Report from './components/Report';
import Submissions from './components/Submissions';
import SubmissionsStudent from './components/SubmissionsStudent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: sessionStorage.getItem('token') ? true : false,
      token: sessionStorage.getItem('token'),
      email: sessionStorage.getItem('email'),
      tempEmail: sessionStorage.getItem('tempEmail'),
    };
  }

  componentDidMount(){
    document.title = "Byte Harvester Assessment Portal"
  }

  login = (email) => {
    this.setState({ isValidated: true, email: email });
  }

  logout = () => {
    this.setState({ isValidated: false, email: '', tempEmail: '' });
    sessionStorage.clear();
    window.location.href = '/dashboard';
  }

  setToken = (args, email) => {
    sessionStorage.setItem('token', args);
    sessionStorage.setItem('email', email)
    this.setState({ token: args, isValidated: true, email: email });
  }

  getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }

  setTempEmail = (email) => {
    sessionStorage.setItem('tempEmail', email);
    this.setState({ tempEmail: email });
  }

  render() {
    const { isValidated, token } = this.state;
    console.log(this.state);

    if (!isValidated || token == '') {
      return (
        <BrowserRouter>
          <NavigationBar isValidated={isValidated} email={this.state.email} logout={this.logout} />
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login setToken={this.setToken} login={this.login} />
            </Route>
            <Route path="/dashboard">
              <Login setToken={this.setToken} />
            </Route>
            <Route path="/password-reset">
              <ForgetPassword setTempEmail={this.setTempEmail} />
            </Route>
            <Route path='/passwordReset/:user_id/:token' component={PasswordReset}>
            </Route>
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <div className="wrapper">
      <BrowserRouter>
        <NavigationBar isValidated={isValidated} email={this.state.email} login={this.login} logout={this.logout} />
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/password-reset">
              <ForgetPassword />
            </Route>
            <Route path="/dashboard">
              <Dashboard email={ this.state.email }/>
            </Route>
            <Route path='/passwordReset/:user_id/:token' component={PasswordReset} />
            <Route path="/profile">
              <Profile email={ this.state.email }/>
            </Route>
            <Route path='/submissions'>
              <Submissions tutorEmail={ this.state.email }/>
            </Route>
            <Route path="/submissionsStudent">
              <SubmissionsStudent email={ this.state.email }/>
            </Route>
            <Route path='/assessment/:student_id/:level_id' component={Assessment} />
            <Route path='/solutions/:student_id/:level_id' component={AssessmentStudent} />
            <Route path='/report'>
            <Report email={ this.state.email } />
            </Route>
            <Redirect from="*" to="/dashboard" />
          </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
