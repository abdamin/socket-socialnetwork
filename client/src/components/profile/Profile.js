import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import ProfileHeader from "./ProfileHeader";
// import ProfileCreds from "./ProfileCreds";
// import ProfileAbout from "./ProfileAbout";
// import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";
import ProfileDetails from "./ProfileDetails";
import ProfileActivities from "./ProfileActivities";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Browse Profiles
              </Link>
            </div>
          </div>
          {/* <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds education={profile.education} experience={profile.experience}/>
          {profile.githubusername ? (
             <ProfileGithub username={profile.githubusername} />
           ) : null}
         </div> */}
          <div className="row">
            <div className="col-md-4 col-xl-3">
              <ProfileDetails profile={profile} />
            </div>
            <div className="col-md-8 col-xl-9">
              <ProfileActivities profile={profile} />
            </div>
          </div>
        </div>
      );
    }
    return <div className="container-fluid p-0">{profileContent}</div>;
  }
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getProfileByHandle: getProfileByHandle },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
