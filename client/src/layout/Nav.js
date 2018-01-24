import React, { Component } from 'react';
import logo from '../logo.svg';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
import NewReceipt from '../receipt/NewReceipt.js';

class Nav extends Component {
  render(){
    let links = <span />;
    if(this.props.user){
      links = (
        <span>
          <Link to="/profile">Profile</Link>
          <Link to="/newreceipt">New Receipt</Link>
          <Logout updateUser={this.props.updateUser} />
        </span>);
    }
    else {
      links = (
        <span>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </span>);
    }

    return(
        <div>
          <nav className="navbar navbar-default">
            <div class="container">
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">
            <a href="/">Home</a>
            {links}
                  </ul>
              </div>
            </div>
          </nav>
          <header className="App-header">
            <h1> Receipt Reader Version 1.0</h1>
          </header>
        </div>
      );
  }
}

export default Nav;
