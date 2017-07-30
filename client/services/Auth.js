import history from "./history";
import auth0 from "auth0-js";
import EventEmitter from 'events';
import { setAuthorizationToken } from "@api";

export default class Auth extends EventEmitter {
  auth0 = new auth0.WebAuth({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    redirectUri: process.env.AUTH_CALLBACK_URL,
    audience: `http://localhost:7777/api`,
    responseType: "token id_token",
    scope: "openid profile email"
  });

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/");
      } else if (err) {
        history.replace("/");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    setAuthorizationToken(authResult.accessToken);
    // navigate to the home route
    history.replace("/");
  }

  logout() {
    // Clear access token and ID token from local storage
    console.log('logout')
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    setAuthorizationToken(null);
    // navigate to the home route
    history.replace("/");
    console.log('should be home now')
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    let isTokenExpired = new Date().getTime() > expiresAt;
    if(isTokenExpired) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      setAuthorizationToken(null);
    }
    if(!this.userProfile && !isTokenExpired) this.getProfile();
    return !isTokenExpired;
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    return accessToken;
  }

  getIdToken() {
    return localStorage.getItem("id_token");
  }

  isTokenExpired() {
    
  }

  userProfile;

  getProfile() {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) this.userProfile = profile;
      if(err) return console.error(err);
      this.emit('profile_set', profile);
    });
  }
}
