import React, { Component } from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  ***REMOVED***
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data (this method check if there are keys in the object)
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              {" "}
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {/*TODO: EXPERIENT AND EDUCATION*/}
            <div style={{ marginBottom: "60px" }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet set up a profile. Please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: Proptypes.func.isRequired,
  profile: Proptypes.object.isRequired,
  auth: Proptypes.object.isRequired,
  deleteAccount: Proptypes.func.isRequired
***REMOVED***

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getCurrentProfile: getCurrentProfile, deleteAccount: deleteAccount },
    dispatch
  );
***REMOVED***

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  ***REMOVED***
***REMOVED***

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
