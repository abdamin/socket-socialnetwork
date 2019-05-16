import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class Suggestions extends Component {
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
        const shortlistedProfiles = profiles.slice(0, 5);
        profileItems = shortlistedProfiles.map(profile => {
          return (
            <div>
              <div className="media">
                <img
                  src={profile.user.avatar}
                  style={{ width: "56px", height: "56px" }}
                  className="rounded-circle mr-2"
                  alt={profile.user.name}
                />
                <div className="media-body">
                  <p className="my-1">
                    <strong>{profile.user.name}</strong>
                  </p>

                  <Link
                    to={`/profile/${profile.handle}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              <hr className="my-2" />
            </div>
          );
        });
      } else {
        profileItems = <h4>{""}</h4>;
      }
    }

    return (
      <div className="card flex-fill mb-3">
        <div className="class-header">
          <div className="card-actions float-right" />
          <h5 className="card-title mb-3 mt-4 ml-3">Developers you may know</h5>
          <hr className="my-2" />
        </div>

        <div className="card-body">{profileItems}</div>
      </div>
    );
  }
}

Suggestions.propTypes = {
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
)(Suggestions);
