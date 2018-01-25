import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Flash from './layout/Flash.js';
import Footer from './layout/Footer.js';
import Home from './Home.js';
import Nav from './layout/Nav.js';
import Login from './auth/Login.js';
import Profile from './Profile.js';
import Signup from './auth/Signup.js';
import NewReceipt from './receipt/NewReceipt.js';
import Confirmation from "./receipt/confirmation.js";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      receiptData: {},
      currentPage: 0
    }
  }
  componentDidMount = () => {
    this.getUser();
  }

  getReceiptData = (data) => {
    this.setState({
      receiptData: data,
      currentPage: 1
    })
  }

  getUser = () => {
    // If there is a token in localStorage
    let token = localStorage.getItem('mernToken');
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      });
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token);
        this.setState({
          token: response.data.token,
          user: response.data.user
        });
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log('cdm', err);
        this.setState({
          token: '',
          user: null
        });
      })
    }
  }

  updateUser = () => {
    this.getUser();
  }

  setFlash = (t, msg) => {
    this.setState({
      flash: msg,
      flashType: t
    });
  }

  cancelFlash = () => {
    this.setState({
      flash: '',
      flashType: ''
    });
  }

  render() {
    if(this.state.currentPage == 0){
          return (
          <div className="App">
            <Router>
              <div>
                <Nav user={this.state.user} />
                <div className="space">
                  <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
                  <Route exact path="/" component={Home} />
                  <Route path="/newreceipt" component={
                     () => (<NewReceipt reset={true} getReceiptData = {this.getReceiptData} setFlash={this.setFlash}/>) } />
                  <Route path="/login" component={
                    () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.updateUser} />)} />
                  <Route path="/signup" component={
                    () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.updateUser} />)} />
                  <Route path="/profile" component={
                    () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
                </div>
              </div>
            </Router>
            <Footer />
          </div>
        );
    } else {
          return (
          <div className="App">
            <Router>
              <div>
                <Nav user={this.state.user} />
                <div className="space">
                  <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
                  <Route exact path="/" component={Home} />
                  <Route path="/newreceipt" component={
                     () => (<Confirmation receiptData={this.state.receiptData} setFlash={this.setFlash}/>) } />
                  <Route path="/login" component={
                    () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.updateUser} />)} />
                  <Route path="/signup" component={
                    () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.updateUser} />)} />
                  <Route path="/profile" component={
                    () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
                </div>
              </div>
            </Router>
            <Footer />
          </div>
        );
    }
  }
}

export default App;
