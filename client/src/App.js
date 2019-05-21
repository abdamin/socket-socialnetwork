import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  updateAvatar,
  updateHandle
} from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AccountVerify from "./components/accountVerification/AccountVerify";

import EmailVerification from "./components/accountVerification/EmailVerification";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ChangePassword from "./components/forgotPassword/ChangePassword";

import AddEducation from "./components/add-credentials/AddEducation";
import AddExperience from "./components/add-credentials/AddExperience";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileActions";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";

import Post from "./components/post/Post";

import Dashboard from "./components/dashboard/Dashboard";

import Social from "./components/social/Social";

//Check for Token and change store state to make it persists over page refreshes as well
if (localStorage.jwtToken) {
  //Set Auth Token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //get avatar url from local storage
  const avatar = localStorage.avatar;

  //get logged in user handle from local storage
  const handle = localStorage.handle;

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Set image url to persist on browser refreshes as well
  store.dispatch(updateAvatar(avatar));

  //Set handle to persist on browser refreshes as well
  store.dispatch(updateHandle(handle));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //TODO:clear the current profile
    store.dispatch(clearCurrentProfile());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />

              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>

              <Route
                exact
                path="/resendVerification"
                component={EmailVerification}
              />
              <Route
                exact
                path="/account-verify/:token"
                component={AccountVerify}
              />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route
                exact
                path="/change-password/:token"
                component={ChangePassword}
              />

              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/social" component={Social} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
