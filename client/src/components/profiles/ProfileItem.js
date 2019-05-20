import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-primary">
              View Profile
            </Link>
          </div>
          {/* <div className="col-md-4 d-none d-md-block"> */}
          <div className="">
            <h4 className="mb-0 pb-0">Skill Set</h4>

            <div className="card-body pl-0">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <span key={index} className="badge badge-primary mr-1 my-1">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
***REMOVED***

export default ProfileItem;
