import React from 'react';
import AccountActions from '../actions/AccountActions.js';
import AccountStore from '../stores/AccountStore.js';

import { Link } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminCreated: false,
      hide: true,
      hideLogin: true,
      startup: false,
      login: false,
      loginId: null,
    };
    this.logOut = this.logOut.bind(this);
  }

  createAdmin() {
    if (!this.state.adminCreated){
      AccountActions.createAdmin();
      this.setState({ adminCreated: true });
    }
  }

  showTextarea() {
    this.setState({ hide: false });
  }

  hideTextarea() {
    this.setState({ hide: true });
  }

  showLogin() {
    // shows login field
    this.setState({ hideLogin: false });
  }

  hideLogin() {
    // hides login field
    this.setState({ hideLogin: true });
  }

  addAccount() {
    let fail = false;
    const accounts = AccountStore.accounts;
    const accountInput = document.getElementById('account-input').value;
    accounts.forEach(account => {
      if(accountInput === account.name) {
        alert('Name used, please choose another account name');
        fail = true;
        return;
      }
    });
    if (!fail) {
      AccountActions.create(accountInput);
      document.getElementById('account-input').value = '';
      this.hideTextarea();
    }
  }

  loginToAccount() {
    // checks from the accounts array, if account doesn't exist, decline
    let login = false;
    const accounts = AccountStore.accounts;
    const loginInput = document.getElementById('login-input').value;
    accounts.forEach(account => {
      if(loginInput === account.name) {
        this.setState({ login: true });
        this.setState({ loginId: loginInput });
        login = true;
        return;
      }
    })
    if (!login) {
      alert('Account information incorrect.');
    }
  }

  logOut() {
    this.setState({ login: false });
  }

  clearLogin() {
    document.getElementById('login-input').value = '';
  }

  renderTextarea() {
    if (this.props.params.user != null) {
      // logic for being logged in
      return (
        <div>
          <div>
            Logged in as {this.props.params.user}
          </div>
          <Link onClick={this.logOut} to="/">
            Logout
          </Link>
        </div>
      )
    }
    else {
      // logic for not being logged in
      // default view
      if (this.state.hide && this.state.hideLogin) {
        return (
          <div>
            <button className="login-button" onClick={this.showLogin.bind(this)}>
              Login
            </button>
            <button className="signup-button" onClick={this.showTextarea.bind(this)}>
              Sign Up
            </button>
          </div>
        );
      }
      else if (!this.state.hide && this.state.hideLogin) {
        // singining up
        return (
          <div>
            <br></br>
            <textarea id="account-input" rows="1" cols="30">
            </textarea>
            <button className="signup-confirm" onClick={this.addAccount.bind(this)}>
              Register
            </button>
            <button className="signup-cancel" onClick={this.hideTextarea.bind(this)}>
              Cancel
            </button>
          </div>
        );
      }
      else if (this.state.hide && !this.state.hideLogin) {
        // logging in
        if (!this.state.login) {
          // gets user name
          return (
            <div>
              <br></br>
              <textarea id="login-input" rows="1" cols="30">
              </textarea>
              <div className="login-confirm-cancel">
                <button className="login-confirm" onClick={this.loginToAccount.bind(this)}>
                  Login
                </button>
                <button className="login-cancel" onClick={this.hideLogin.bind(this)}>
                  Cancel
                </button>
              </div>
            </div>
          );
        }
        else if (this.state.login) {
          // moves to new link
          return (
            <div>
              <div>
                <Link to={`/${this.state.loginId}`}>
                  Confirm login as {this.state.loginId}
                </Link>
              </div>
            </div>
          )
        }
      }
    }
  }

  render() {
    const accounts = AccountStore.accounts;
    console.log({ accounts });
    return (
      <div className="container">
        {this.createAdmin()}
        <h1>Welcome to ScratchBlog, a blog made from scratch!</h1>
        {this.renderTextarea()}
        {this.props.children}
      </div>
    );
  }
}

export default App;
