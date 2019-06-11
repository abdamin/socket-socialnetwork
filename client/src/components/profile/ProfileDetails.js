import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";

import { Home, MessageSquare } from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faGraduationCap,
  faBook,
  faUniversity,
  faClock,
  faBriefcase,
  faBuilding,
  faMapMarker
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

class ProfileDetails extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    ***REMOVED***
  }
  render() {
    const { profile } = this.props;

    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Profile Details</h5>
        </div>

        <Modal />

        <ProfileHeader profile={profile} showModal={this.state.showModal} />

        <hr className="my-0" />
        <EducationItems profile={profile} />

        <hr className="my-0" />
        <ExperienceItems profile={profile} />

        <hr className="my-0" />
        <SocialLinks profile={profile} />
      </div>
    );
  }
}

const Modal = () => {
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Feature Coming Soon
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              We are still working on making this feature available to you as
              soon as possible
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
***REMOVED***

const EducationItems = ({ profile }) => {
  const eduItems = profile.education.map(edu => (
    <div key={edu._id}>
      <ul className="list-unstyled mb-0">
        <li className="mb-1">
          <FontAwesomeIcon icon={faGraduationCap} fixedWidth className="mr-1" />
          {edu.degree}
        </li>

        <li className="mb-1">
          <FontAwesomeIcon icon={faBook} fixedWidth className="mr-1" />
          {edu.fieldofstudy}
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faUniversity} fixedWidth className="mr-1" />
          {edu.school}
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faClock} fixedWidth className="mr-1" />
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Present"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </li>
      </ul>
      <br />
    </div>
  ));

  return (
    <div className="card-body">
      <h5 className="card-title">Education</h5>
      {eduItems.length > 0 ? (
        <ul className="list-group"> {eduItems} </ul>
      ) : (
        <p className="text-center">No Education Listed</p>
      )}
    </div>
  );
***REMOVED***

const ExperienceItems = ({ profile }) => {
  const expItems = profile.experience.map(exp => (
    <div key={exp._id}>
      <ul className="list-unstyled mb-0">
        <li className="mb-1">
          <FontAwesomeIcon icon={faBriefcase} fixedWidth className="mr-1" />
          {exp.title}
        </li>

        <li className="mb-1">
          <FontAwesomeIcon icon={faBuilding} fixedWidth className="mr-1" />
          {exp.company}
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faMapMarker} fixedWidth className="mr-1" />
          {exp.location}
        </li>
        <li className="mb-1">
          <FontAwesomeIcon icon={faClock} fixedWidth className="mr-1" />
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Present"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </li>
      </ul>
      <br />
    </div>
  ));

  return (
    <div className="card-body">
      <h5 className="card-title">Experience</h5>
      {expItems.length > 0 ? (
        <ul className="list-group"> {expItems} </ul>
      ) : (
        <p className="text-center">No Experience Listed</p>
      )}
    </div>
  );
***REMOVED***

const SocialLinks = ({ profile }) => {
  return (
    <div className="card-body">
      <h5 className="card-title">Elsewhere</h5>

      <ul className="list-unstyled mb-0">
        {isEmpty(profile.website) ? null : (
          <li className="mb-1">
            <FontAwesomeIcon icon={faGlobe} fixedWidth className="mr-1" />
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              {profile.website}
            </a>
          </li>
        )}
        {isEmpty(profile.social && profile.social.twitter) ? null : (
          <li className="mb-1">
            <FontAwesomeIcon icon={faTwitter} fixedWidth className="mr-1" />
            <a
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
        )}
        {isEmpty(profile.social && profile.social.facebook) ? null : (
          <li className="mb-1">
            <FontAwesomeIcon icon={faFacebook} fixedWidth className="mr-1" />
            <a
              href={profile.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
        )}
        {isEmpty(profile.social && profile.social.instagram) ? null : (
          <li className="mb-1">
            <FontAwesomeIcon icon={faInstagram} fixedWidth className="mr-1" />
            <a
              href={profile.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        )}
        {isEmpty(profile.social && profile.social.linkedin) ? null : (
          <li className="mb-1">
            <FontAwesomeIcon icon={faLinkedin} fixedWidth className="mr-1" />
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
          </li>
        )}
        {isEmpty(profile.social && profile.social.youtube) ? null : (
          <li className="mb-1">
            <FontAwesomeIcon icon={faYoutube} fixedWidth className="mr-1" />
            <a
              href={profile.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              Youtube
            </a>
          </li>
        )}
      </ul>
    </div>
  );
***REMOVED***

const ProfileHeader = ({ profile, showModal }) => {
  const skills = profile.skills.map((skill, index) => (
    <span key={index} className="badge badge-primary mr-1 my-1">
      {skill}
    </span>
  ));
  return (
    <div>
      <div className="card-body text-center">
        <img
          src={profile.user.avatar}
          alt="Stacie Hall"
          className="img-fluid rounded-circle mb-2"
          style={{ width: "132px", height: "132px" }}
        />
        <h5 className="card-title mb-0">{profile.user.name}</h5>
        <div className="text-muted mb-2">
          {isEmpty(profile.status) || profile.status === "0" ? null : (
            <span>{profile.status}</span>
          )}
        </div>

        <div>
          <button
            data-toggle="modal"
            data-target="#exampleModalCenter"
            className="btn btn-primary btn-sm mr-1"
          >
            Follow
          </button>
          <button
            data-toggle="modal"
            data-target="#exampleModalCenter"
            className="btn btn-primary btn-sm"
            size="sm"
            color="primary"
          >
            <MessageSquare width={16} height={16} /> Message
          </button>
        </div>
      </div>

      <hr className="my-0" />
      <div className="card-body">
        <h5 className="card-title">Skills</h5>
        {skills}
      </div>

      {isEmpty(profile.location) ? null : (
        <div>
          <hr className="my-0" />
          <div className="card-body">
            <h5 className="card-title">About</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-1">
                <Home width={14} height={14} className="mr-1" />
                Lives in {profile.location}
              </li>
            </ul>
          </div>
        </div>
      )}

      <hr className="my-0" />
      <div className="card-body">
        <h5 className="card-title">Bio</h5>
        <ul className="list-unstyled mb-0">
          <li className="mb-1">
            <FontAwesomeIcon icon={faUser} fixedWidth className="mr-1" />
            {isEmpty(profile.bio) ? <span /> : <span> {profile.bio} </span>}
          </li>
        </ul>
      </div>
    </div>
  );
***REMOVED***

export default ProfileDetails;
