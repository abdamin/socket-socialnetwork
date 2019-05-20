import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profiles found...</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12 pl-5 pr-5">
              <div className="post-form mb-3">
                <div className="card card-info">
                  <div className="card-header bg-light text-white">
                    <h3 className="card-title">Developer Profiles</h3>
                    <h5 className="card-subtitle text-muted">
                      {" "}
                      Browse and Connect with Developers
                    </h5>
                  </div>

                  <div className="card-body pl-5 pr-5">{profileItems}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getProfiles: getProfiles }, dispatch);
};
const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
