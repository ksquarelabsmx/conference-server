import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./Login.css";
import LoginCard from './LoginCard'

class LoginPage extends Component {
  onFailure = res => {
    console.log("Error:", res);
  };

  render() {
    return (
      <div className="login-page">
        {this.props.auth.jwt == null ? (
          <LoginCard>
            <GoogleLogin
              clientId="129092023456-82964pfqurangtddv4q9g4q62cbq6abm.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              className="login-button"
              onSuccess={this.props.auth.onLogin}
              onFailure={this.onFailure}
            />
          </LoginCard>
        ) : (
          <GoogleLogout
            buttonText="Logout"
            className="login-button"
            onLogoutSuccess={this.props.auth.onLogout}
          />
        )}
      </div>
    );
  }
}

export default LoginPage;
