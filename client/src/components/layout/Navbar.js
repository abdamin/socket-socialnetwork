import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { bindActionCreators } from "redux";
import { clearCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  ***REMOVED***

  render() {
    const { isAuthenticated } = this.props.auth;
    const avatar = !isEmpty(this.props.profile.profile)
      ? this.props.auth.avatar
      : "";
    const handle = !isEmpty(this.props.profile.profile)
      ? this.props.profile.profile.handle
      : "";
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/social">
            Social
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/profile/${handle}`}>
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a href="/" onClick={this.onLogoutClick} className="nav-link">
            <img
              className="rounded-circle"
              src={avatar}
              alt="user.name"
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a gravatar connected to your email to display an image"
            />
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  <FontAwesomeIcon className="mr-1" icon={faSearch} />
                  Developer Profiles
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
***REMOVED***

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { logoutUser: logoutUser, clearCurrentProfile: clearCurrentProfile },
    dispatch
  );
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
